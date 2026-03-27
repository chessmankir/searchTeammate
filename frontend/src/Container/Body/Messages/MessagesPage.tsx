import {useState} from "react";
import "../../../StyleSheets/messages.css";
import {MessageHeader} from "../Member/MessageHeader.tsx";
import {MessageSidebar} from "../Member/MessageSidebar/MessageSidebar.tsx";
import {MessageChat} from "../Member/MessageChat.tsx";

type Message = {
    id: number;
    sender: "me" | "other";
    text: string;
    time: string;
};

type Conversation = {
    id: number;
    nickname: string;
    lastMessage: string;
    unread: number;
};

const mockConversations: Conversation[] = [
    {id: 1, nickname: "DarkKnight", lastMessage: "Го вечером катку", unread: 2},
    {id: 2, nickname: "Игрок123", lastMessage: "Ок, до встречи", unread: 0},
    {id: 3, nickname: "Drakon_777", lastMessage: "Ты где?", unread: 5},
];

const mockMessages: Record<number, Message[]> = {
    1: [
        {id: 1, sender: "me", text: "Привет! Как дела?", time: "15:30"},
        {id: 2, sender: "other", text: "Норм, ты как?", time: "15:31"},
        {id: 3, sender: "me", text: "Го вечером катку", time: "15:32"},
    ]
};

export default function MessagesPage() {
    const [activeId, setActiveId] = useState<number>(1);
    const [input, setInput] = useState("");

    const activeMessages = mockMessages[activeId] || [];

    return (
        <div className="messages-page">
            <MessageHeader />
            <div className="messages-container">
                <MessageSidebar />
                <MessageChat mockConversations={mockConversations} activeMessages={activeMessages}
                 activeId={activeId} input={input} setInput={setInput} />
            </div>
        </div>
    );
}