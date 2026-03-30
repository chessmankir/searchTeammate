import {MessageChatItem} from "./MessageChatItem.tsx";

export  function MessageChatList({conversations, conversationId}) {
    return(
        <div className="messages-sidebar-list">
            {conversations?.map((conversation) => (
                <MessageChatItem conversationId={conversationId} conversation={conversation}/>
            ))}
        </div>
    )
}