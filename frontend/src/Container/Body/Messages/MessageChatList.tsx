import { MessageChatItem } from "./MessageChatItem.tsx";
import type { Conversation } from "../../../types/Conversation.ts";

type Props = {
    conversations?: Conversation[];
    conversationId: string | null;
};

export function MessageChatList({ conversations, conversationId }: Props) {
    return (
        <div className="messages-sidebar-list">
            {conversations?.map((conversation) => (
                <MessageChatItem
                    key={conversation.id}
                    conversationId={conversationId}
                    conversation={conversation}
                />
            ))}
        </div>
    );
}