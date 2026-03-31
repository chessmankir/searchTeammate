import type { Message } from "../../../types/Message.ts";
import type { RefObject } from "react";

type Props = {
    user_id: number | undefined;
    activeMessages: Message[];
    messageRef: RefObject<HTMLDivElement | null>;
};

export function MessageList({ user_id, activeMessages, messageRef }: Props) {
    return (
        <div className="messages-list" ref={messageRef}>
            {activeMessages.map((msg) => (
                <div
                    key={msg.id}
                    className={`messages-bubble ${
                        msg.sender_id === user_id ? "me" : "other"
                    }`}
                >
                    {msg.body}
                    <div className="messages-time">{msg.time}</div>
                </div>
            ))}
        </div>
    );
}