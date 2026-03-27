export function MessageChatItem({memberMessage}){
    return (
        <div className="messages-chat-item active">
            <div className="messages-chat-row">
                <div>{memberMessage.title}</div>
                <span className="messages-badge">{memberMessage.unreadCount}</span>
            </div>
            <div className="messages-last">{memberMessage.message}</div>
        </div>
    );
}