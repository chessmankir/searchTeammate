export function MessageSend({ message, setMessage, sendMessage}){
    return (
        <div className="messages-input-row">
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {if(e.key === 'Enter') sendMessage();}}
                placeholder="Написать сообщение..."
                className="messages-input"
            />
            <button className="messages-send" onClick={() => sendMessage()}>
                Отправить
            </button>
        </div>
    )
}