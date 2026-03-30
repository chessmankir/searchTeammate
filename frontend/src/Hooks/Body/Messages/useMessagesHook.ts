import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Conversation} from "../../../types/Conversation.ts";
import type {Message} from "../../../types/Message.ts";
import {socket} from "../../../api/socket.ts";

export function useMessagesHook(){
    const [searchParams] = useSearchParams();
    const conversationId =  searchParams.get("conversation");
    const [activeConversation ,setActiveConversation] = useState<Conversation>();
    const [message, setMessage] = useState('');
    const [activeMessages, setActiveMessages] = useState<Message[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>();
    const messageRef = useRef<HTMLDivElement | null>(null);

    //активный чат
    useEffect(()=>{
        if (!conversationId) return;
        (async() => {
            const backend = `http://localhost:4000/api/conversations/${conversationId}`;
            const response = await fetch(backend, {
                credentials: "include",
            });
            const data = await response.json();
            if(data.ok){
                setActiveConversation(data.data)
            }
        })();
    },[conversationId]);

    //список сообщений
    useEffect(() => {
        (async() => {
            const backend = `http://localhost:4000/api/conversations/${conversationId}/messages`;
            const response = await fetch(backend, {
                credentials: "include",
            });
            const data = await response.json();
            if(data.ok){
                const updatedMessages = data.messages.map((message) =>
                    ({...message, time: (new Date(message.created_at)).toLocaleTimeString([],{
                        hour: '2-digit',
                        minute: '2-digit',
                        })}))
                setActiveMessages(updatedMessages);
            }
        })();
    }, [conversationId]);

    //список чатов
    useEffect(() => {
        (async () => {
            const backend = `http://localhost:4000/api/get/conversations`;
            const response = await fetch(backend, {
                credentials: "include",
            });
            const data = await response.json();
            if(data.ok){
                setConversations(data.conversations);
            }
        })();
    },[conversationId]);

    useEffect(() => {
        const handleNewMessage = (newMessage: Message) => {
            if (Number(conversationId) != newMessage.conversation_id) return; // проверить типы
            setActiveMessages((prev) => {
                const exists = prev.some((msg) => msg.id === newMessage.id);
                if (exists) return prev;
                return [...prev, newMessage];
            });
        };

        socket.on("message:new", handleNewMessage);

        return () => {
            socket.off("message:new", handleNewMessage);
        };
    }, [conversationId]);

    useEffect(() => {
        const el = messageRef.current;
        if(!el) return;
        const isNearBottom =  el.scrollHeight - el.scrollTop - el.clientHeight < 100;

        if(isNearBottom){
            el.scrollTop = el.scrollHeight;
        }
    }, [activeMessages]);

    const sendMessage = async () => {
        const backend = `http://localhost:4000/api/conversations/${conversationId}/messages`;
        try{
            const response = await fetch(backend, {
                credentials: "include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: message.trim()
                })
            });
            const data = await response.json();
            if(data.ok){
                console.log('сообщение успешно');
                setMessage("");
                return true;
            }
            return false;
        }
        catch(error){
            console.log(error);
            return  false;
        }
    }

    return {activeConversation, message, setMessage, sendMessage, activeMessages, conversations, conversationId, messageRef};
}

