export function MessageSend({input, setInput}){
    return (
        <div className="messages-input-row">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Написать сообщение..."
                className="messages-input"
            />
            <button className="messages-send">
                Отправить
            </button>
        </div>
    )
}