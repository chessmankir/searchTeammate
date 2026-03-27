import {MessageList} from "./MessageList.tsx";
import {MessageSend} from "./MessageSend.tsx";

export  function  MessageChat({mockConversations, activeMessages, activeId, input, setInput}){
    return (
        <div className="messages-chat">
            <div className="messages-chat-header">
                {mockConversations.find(c => c.id === activeId)?.nickname}
            </div>
            <MessageList activeMessages={activeMessages} />

            <MessageSend input={input} setInput={setInput} />

        </div>
    )
}