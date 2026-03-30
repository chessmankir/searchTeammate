import {MessageList} from "./MessageList.tsx";
import {MessageSend} from "./MessageSend.tsx";

export  function  MessageChat({messageRef, activeConversation, activeMessages, message, setMessage, sendMessage}){
    return (
        <div className="messages-chat">
            <div className="messages-chat-header">
                {activeConversation?.nickname}
            </div>
            <MessageList messageRef={messageRef} user_id={activeConversation?.user_id} activeMessages={activeMessages} />
            <MessageSend  message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    )
}