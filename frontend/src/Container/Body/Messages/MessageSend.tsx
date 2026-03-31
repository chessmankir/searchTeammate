type Props = {
    message: string;
    setMessage: (value: string) => void;
    sendMessage: () => void | Promise<boolean>;
};

export function MessageSend({ message, setMessage, sendMessage }: Props) {
    return (
        <div className="messages-input-row">
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault(); // чтобы не было лишнего поведения
                        sendMessage();
                    }
                }}
                placeholder="Написать сообщение..."
                className="messages-input"
            />

            <button
                type="button"
                className="messages-send"
                onClick={sendMessage}
            >
                Отправить
            </button>
        </div>
    );
}