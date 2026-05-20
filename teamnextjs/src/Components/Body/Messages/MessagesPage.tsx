"use client";

import "@/src/StyleSheets/messages.css";
import {useMessagesHook} from "@/src/Hooks/Body/Messages/useMessagesHook";
import {useSocketJoin} from "@/src/Hooks/Body/Messages/userSocketJoin";
import {authStore} from "@/src/Store/authStore";
import {MessageHeader} from "@/src/Components/Body/Messages/MessageHeader";
import {MessageSidebar} from "@/src/Components/Body/Messages/MessageSidebar/MessageSidebar";
import {MessageChat} from "@/src/Components/Body/Messages/MessageChat";

export default function MessagesPage() {
    const user = authStore((state) => state.user);
    useSocketJoin(user?.id);
    const {activeConversation, message, setMessage, sendMessage,
        activeMessages, conversations, conversationId,messageRef}  = useMessagesHook();
    return (
        <div className="messages-page">
            <MessageHeader />
            <div className="messages-container">
                <MessageSidebar conversationId={conversationId} conversations={conversations} />
                <MessageChat messageRef={messageRef} activeConversation={activeConversation} activeMessages={activeMessages}
                             message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}