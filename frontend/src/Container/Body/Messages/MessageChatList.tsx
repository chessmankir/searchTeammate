import {MessageChatItem} from "./MessageChatItem.tsx";

export  function MessageChatList({conversations}) {
    console.log(conversations);
    return(
        <div className="messages-sidebar-list">
            {conversations?.map((conversation) => (
                <MessageChatItem conversation={conversation}/>
            ))}
        </div>
    )
}