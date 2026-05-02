import type { Conversation } from "@/src/types/Conversation.ts";
import {useRouter} from "next/navigation";

type Props = {
    conversation: Conversation;
    conversationId: string | null;
};

export function MessageChatItem({ conversation, conversationId }: Props) {
    const navigate = useRouter();
    return (
        <div
            onClick={() => {
                navigate.push(`/messages?conversation=${conversation.conversation_id}`);
            }}
            className={
                String(conversationId) === String(conversation.conversation_id)
                    ? "messages-chat-item active"
                    : "messages-chat-item"
            }
        >
            <div className="messages-chat-row">
                <div>{conversation.nickname}</div>
                {Number(conversation.unread_count) > 0 && (
                 <span className="messages-badge">{conversation.unread_count}</span>
                 )}
            </div>
            <div className="messages-last">{conversation.last_message}</div>
        </div>
    );
}