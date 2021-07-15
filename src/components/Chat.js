import { Button } from "react-bootstrap"
import ConnectedUsers from "./ConnectedUsers"
import MessageContainer from "./MessageContainer"
import SendMessageForm from "./SendMessageForm"

const Chat = ({messages, sendMessage, closeConnection, users}) => {
    return ( 
    <div className="mainChatCont">
        <div className="leave-room">
            <Button variant="danger"
             onClick={()=>{closeConnection()}}>Leave Room</Button>
        </div>
        <div className="chatB">
        <ConnectedUsers users={users} />
        <div className="chat">
            <MessageContainer messages={messages}/>
            <SendMessageForm sendMessage={sendMessage} />
        </div>

        </div>
    </div> );
}
 
export default Chat;