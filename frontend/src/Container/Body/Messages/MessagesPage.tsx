import {useState} from "react";
import "../../../StyleSheets/messages.css";
import {MessageHeader} from "./MessageHeader.tsx";
import {MessageSidebar} from "../Member/MessageSidebar/MessageSidebar.tsx";
import {MessageChat} from "./MessageChat.tsx";
import {useMessagesHook} from "../../../Hooks/Body/Messages/useMessagesHook.ts";
import {userSocketJoin} from "../../../Hooks/Body/Messages/userSocketJoin.ts";
import {authStore} from "../../../store/authStore.ts";

export default function MessagesPage() {
    const user = authStore((state) => state.user);
    userSocketJoin(user?.id);
    const {activeConversation, message, setMessage, sendMessage, activeMessages, conversations}  = useMessagesHook();
    console.log(conversations);
    return (
        <div className="messages-page">
            <MessageHeader />
            <div className="messages-container">
                <MessageSidebar conversations={conversations} />
                <MessageChat activeConversation={activeConversation} activeMessages={activeMessages}
                  message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}