import {MessageChatItem} from "../MessageChatItem.tsx";
import {MessageSearch} from "../MessageSearch.tsx";
import {MessageChatList} from "../MessageChatList.tsx";

export function MessageSidebar(){
    const memberMessages = [
        {
            title: "DarkKnigt",
            message: "го вечером катку",
            unreadCount: 2,
        },
        {
            title: "Валера",
            message: "Ок, до встречи",
            unreadCount: 0,
        },
        {
            title: "Drakon_777",
            message: "Ты где",
            unreadCount: 4,
        }
    ]
    return (
        <div className="messages-sidebar">
            <MessageSearch />
            <MessageChatList memberMessages={memberMessages} />
        </div>
    )
}