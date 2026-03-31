import "../../../StyleSheets/messages.css";
import {MessageHeader} from "./MessageHeader.tsx";
import {MessageSidebar} from "./MessageSidebar/MessageSidebar.tsx";
import {MessageChat} from "./MessageChat.tsx";
import {useMessagesHook} from "../../../Hooks/Body/Messages/useMessagesHook.ts";
import {useSocketJoin} from "../../../Hooks/Body/Messages/userSocketJoin.ts";
import {authStore} from "../../../store/authStore.ts";

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