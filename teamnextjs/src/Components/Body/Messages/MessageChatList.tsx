import { MessageChatItem } from "./MessageChatItem";
import type { Conversation } from "../../../types/Conversation.ts";

type Props = {
    conversations?: Conversation[];
    conversationId: string | null;
};

export function MessageChatList({ conversations, conversationId }: Props) {
    return (
        <div className="messages-sidebar-list">
            {conversations?.map((conversation, index) => (
                <MessageChatItem
                    key={index}
                    conversationId={conversationId}
                    conversation={conversation}
                />
            ))}
        </div>
    );
}