export function MessageChatItem({conversation}){
    return (
        <div className="messages-chat-item active">
            <div className="messages-chat-row">
                <div>{conversation?.nickname}</div>
                {/*<span className="messages-badge">{conversation.unreadCount}</span>*/}
            </div>
            <div className="messages-last">{conversation?.last_message}</div>
        </div>
    );
}