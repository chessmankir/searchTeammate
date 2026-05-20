
import { useEffect, useRef, useState } from "react";
import type { Conversation } from "@/src/types/Conversation";
import type { Message } from "@/src/types/Message";
import { socket } from "@/src/Api/socket";
import {useSearchParams} from "next/navigation";

export function useMessagesHook() {
    const searchParams = useSearchParams();
    const conversationId = searchParams.get("conversation");

    const [activeConversation, setActiveConversation] = useState<Conversation>();
    const [message, setMessage] = useState("");
    const [activeMessages, setActiveMessages] = useState<Message[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const messageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!conversationId) return;

        (async () => {
            const url = process.env.NEXT_PUBLIC_API_URL;
            const backendServer = `${url}/api/chat/${conversationId}/read`;
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(backendServer, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if(data.ok) {
                    const newConversations = conversations.map((conversation) => {
                       if(conversation.id === Number(conversationId)) {
                           return {...conversation, unread_count: 0};
                       }
                       else{
                           return conversation;
                       }
                    });
                    setConversations(newConversations);
                }
            }
            catch (e){
                console.error(e);
            }
        })();
    }, [conversationId]);

    useEffect(() => {
        if (!conversationId) return;
        const url = process.env.NEXT_PUBLIC_API_URL;
        (async () => {
            const backend = `${url}/api/chat/conversations/${conversationId}/`;
            const token = localStorage.getItem("token");
            const response = await fetch(backend, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (data.ok) {
                setActiveConversation(data.data);
            }
        })();
    }, [conversationId]);

    useEffect(() => {
        if (!conversationId) return;
        const url = process.env.NEXT_PUBLIC_API_URL;
        (async () => {
            const token = localStorage.getItem("token");
            const backend = `${url}/api/chat/${conversationId}/messages`;
            const response = await fetch(backend, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (data.ok) {
                const updatedMessages = data.messages.map((message: Message) => ({
                    ...message,
                    time: new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                }));

                setActiveMessages(updatedMessages);
            }
        })();
    }, [conversationId]);

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_API_URL;
        (async () => {
            const token = localStorage.getItem("token");
            const backend = `${url}/api/chat/conversations`;
            const response = await fetch(backend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            });
            const data = await response.json();

            if (data.ok) {
                setConversations(data.conversations);
            }
        })();
    }, [conversationId]);

    useEffect(() => {
        const handleNewMessage = async (newMessage: Message) => {

            const isActiveChat =
                Number(conversationId) === Number(newMessage.conversation_id);
            const token = localStorage.getItem("token");
            if (isActiveChat) {
                setActiveMessages((prev) => {
                    const exists = prev.some((msg) => msg.id === newMessage.id);
                    if (exists) return prev;

                    return [...prev, newMessage];
                });

                // 🔥 сразу помечаем как прочитанное
                try {
                    const url = process.env.NEXT_PUBLIC_API_URL;
                    await fetch(
                        `${url}/api/chat/${newMessage.conversation_id}/read`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            method: "PUT",
                            credentials: "include",
                        }
                    );
                } catch (e) {
                    console.log("read error:", e);
                }
            }

            setConversations((prev) =>
                prev.map((conversation) => {
                    if (
                        Number(conversation.conversation_id) !==
                        Number(newMessage.conversation_id)
                    ) {
                        return conversation;
                    }

                    return {
                        ...conversation,
                        last_message: newMessage.body,
                        unread_count: isActiveChat
                            ? 0
                            : Number(conversation.unread_count ?? 0) + 1,
                    };
                })
            );
        };

        socket.on("message:new", handleNewMessage);

        return () => {
            socket.off("message:new", handleNewMessage);
        };
    }, [conversationId]);

    useEffect(() => {
        const el = messageRef.current;
        if (!el) return;

        const isNearBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight < 100;

        if (isNearBottom) {
            el.scrollTop = el.scrollHeight;
        }
    }, [activeMessages]);

    const sendMessage = async () => {
        const url = process.env.NEXT_PUBLIC_API_URL;
        const backend = `${url}/api/chat/${conversationId}/messages`;
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(backend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                credentials: "include",
                method: "POST",
                body: JSON.stringify({
                    message: message.trim(),
                }),
            });

            const data = await response.json();
            if (data.ok) {
                setMessage("");
                return true;
            }

            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    return {
        activeConversation,
        message,
        setMessage,
        sendMessage,
        activeMessages,
        conversations,
        conversationId,
        messageRef,
    };
}