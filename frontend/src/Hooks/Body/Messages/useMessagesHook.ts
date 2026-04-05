import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { Conversation } from "../../../types/Conversation.ts";
import type { Message } from "../../../types/Message.ts";
import { socket } from "../../../api/socket.ts";

export function useMessagesHook() {
    const [searchParams] = useSearchParams();
    const conversationId = searchParams.get("conversation");

    const [activeConversation, setActiveConversation] = useState<Conversation>();
    const [message, setMessage] = useState("");
    const [activeMessages, setActiveMessages] = useState<Message[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const messageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!conversationId) return;

        (async () => {
            const url = import.meta.env.VITE_API_URL;
            const backendServer = `${url}/api/conversations/${conversationId}/read`;
            try {
                const response = await fetch(backendServer, {
                    method: "PUT",
                    credentials: "include",
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
        const url = import.meta.env.VITE_API_URL;
        (async () => {
            const backend = `${url}/api/conversations/${conversationId}`;
            const response = await fetch(backend, {
                credentials: "include",
            });
            const data = await response.json();

            if (data.ok) {
                setActiveConversation(data.data);
            }
        })();
    }, [conversationId]);

    useEffect(() => {
        if (!conversationId) return;
        const url = import.meta.env.VITE_API_URL;
        (async () => {

            const backend = `${url}/api/conversations/${conversationId}/messages`;
            const response = await fetch(backend, {
                credentials: "include",
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
        const url = import.meta.env.VITE_API_URL;
        (async () => {
            const backend = `${url}/api/get/conversations`;
            const response = await fetch(backend, {
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
            console.log("handleNewMessage:", newMessage);

            const isActiveChat =
                Number(conversationId) === Number(newMessage.conversation_id);

            if (isActiveChat) {
                setActiveMessages((prev) => {
                    const exists = prev.some((msg) => msg.id === newMessage.id);
                    if (exists) return prev;

                    return [...prev, newMessage];
                });

                // 🔥 сразу помечаем как прочитанное
                try {
                    const url = import.meta.env.VITE_API_URL;
                    await fetch(
                        `${url}/api/conversations/${newMessage.conversation_id}/read`,
                        {
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
        const url = import.meta.env.VITE_API_URL;
        const backend = `${url}/api/conversations/${conversationId}/messages`;

        try {
            const response = await fetch(backend, {
                credentials: "include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: message.trim(),
                }),
            });

            const data = await response.json();
            console.log('sendMessage:');
            console.log(data);
            if (data.ok) {
                console.log("сообщение успешно");
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