import {MessageList} from "./MessageList.tsx";
import {MessageSend} from "./MessageSend.tsx";

export  function  MessageChat({activeConversation, activeMessages, message, setMessage, sendMessage}){
    return (
        <div className="messages-chat">
            <div className="messages-chat-header">
                {activeConversation?.nickname}
            </div>
            <MessageList user_id={activeConversation?.user_id} activeMessages={activeMessages} />
            <MessageSend  message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    )
}