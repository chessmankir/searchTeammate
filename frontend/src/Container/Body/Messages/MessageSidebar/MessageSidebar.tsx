import { MessageSearch } from "../MessageSearch.tsx";
import { MessageChatList } from "../MessageChatList.tsx";
import type { Conversation } from "../../../../types/Conversation.ts";

type Props = {
    conversations?: Conversation[];
    conversationId: string | null;
};

export function MessageSidebar({ conversations, conversationId }: Props) {
    return (
        <div className="messages-sidebar">
            <MessageSearch />
            <MessageChatList
                conversations={conversations}
                conversationId={conversationId}
            />
        </div>
    );
}