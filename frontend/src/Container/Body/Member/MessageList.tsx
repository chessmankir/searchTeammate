export  function MessageList({activeMessages}){
    return (
        <div className="messages-list">
            {activeMessages.map(msg => (
                <div
                    key={msg.id}
                    className={`messages-bubble ${msg.sender}`}
                >
                    {msg.text}
                    <div className="messages-time">{msg.time}</div>
                </div>
            ))}
        </div>
    )
}