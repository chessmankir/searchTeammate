import {useNavigate} from "react-router-dom";

export function MessageChatItem({conversation, conversationId}){
    const navigate = useNavigate();
    return (
        <div onClick={() => { console.log('click'); console.log(conversation.conversation_id);
            navigate(`/messages?conversation=${conversation.conversation_id}`)}} className={conversationId == conversation.conversation_id ? "messages-chat-item active" : "messages-chat-item"}>
            <div className="messages-chat-row">
                <div>{conversation?.nickname}</div>
                {/*<span className="messages-badge">{conversation.unreadCount}</span>*/}
            </div>
            <div  className="messages-last">{conversation?.last_message}</div>
        </div>
    );
}