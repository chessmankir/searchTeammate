import type { RefObject } from "react";
import type { Conversation } from "../../../types/Conversation.ts";
import type { Message } from "../../../types/Message.ts";
import { MessageList } from "./MessageList.tsx";
import { MessageSend } from "./MessageSend.tsx";

type Props = {
    messageRef: RefObject<HTMLDivElement | null>;
    activeConversation?: Conversation;
    activeMessages: Message[];
    message: string;
    setMessage: (value: string) => void;
    sendMessage: () => void | Promise<boolean>;
};

export function MessageChat({
                                messageRef,
                                activeConversation,
                                activeMessages,
                                message,
                                setMessage,
                                sendMessage,
                            }: Props) {
    return (
        <div className="messages-chat">
            <div className="messages-chat-header">
                {activeConversation?.nickname ?? "Чат"}
            </div>

            <MessageList
                messageRef={messageRef}
                user_id={activeConversation?.user_id}
                activeMessages={activeMessages}
            />

            <MessageSend
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
        </div>
    );
}