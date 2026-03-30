import {MessageChatItem} from "../../Messages/MessageChatItem.tsx";
import {MessageSearch} from "../../Messages/MessageSearch.tsx";
import {MessageChatList} from "../../Messages/MessageChatList.tsx";

export function MessageSidebar({conversations, conversationId}){
    return (
        <div className="messages-sidebar">
            <MessageSearch />
            <MessageChatList conversations={conversations} conversationId={conversationId} />
        </div>
    )
}