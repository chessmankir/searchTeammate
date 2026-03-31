import { useNavigate } from "react-router-dom";
import type { Conversation } from "../../../types/Conversation.ts";

type Props = {
    conversation: Conversation;
    conversationId: string | null;
};

export function MessageChatItem({ conversation, conversationId }: Props) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => {
                navigate(`/messages?conversation=${conversation.conversation_id}`);
            }}
            className={
                String(conversationId) === String(conversation.conversation_id)
                    ? "messages-chat-item active"
                    : "messages-chat-item"
            }
        >
            <div className="messages-chat-row">
                <div>{conversation.nickname}</div>
                {/* <span className="messages-badge">{conversation.unreadCount}</span> */}
            </div>
            <div className="messages-last">{conversation.last_message}</div>
        </div>
    );
}