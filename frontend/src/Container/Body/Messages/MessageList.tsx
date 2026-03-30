
export  function MessageList({user_id, activeMessages, messageRef}){
    return (
        <div className="messages-list" ref={messageRef}>
            {activeMessages.map(msg => (
                <div
                    key={msg.id}
                    className={`messages-bubble ${msg.sender_id == user_id ? "other" : "me"}`}
                >
                    {msg.body}
                    <div className="messages-time">{msg.time}</div>
                </div>
            ))}
        </div>
    )
}