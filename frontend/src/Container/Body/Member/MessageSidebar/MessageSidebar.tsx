import {MessageChatItem} from "../../Messages/MessageChatItem.tsx";
import {MessageSearch} from "../../Messages/MessageSearch.tsx";
import {MessageChatList} from "../../Messages/MessageChatList.tsx";

export function MessageSidebar({conversations}){
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
    console.log(conversations);
    return (
        <div className="messages-sidebar">
            <MessageSearch />
            <MessageChatList conversations={conversations} />
        </div>
    )
}