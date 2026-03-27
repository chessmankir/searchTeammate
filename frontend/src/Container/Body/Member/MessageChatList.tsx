import {MessageChatItem} from "./MessageChatItem.tsx";

export  function MessageChatList({memberMessages}) {
    return(
        <div className="messages-sidebar-list">
            {memberMessages.map((member) => (
                <MessageChatItem memberMessage={member}/>
            ))}
        </div>
    )
}