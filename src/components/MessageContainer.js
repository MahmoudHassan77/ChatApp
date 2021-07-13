import { useEffect, useRef, useState } from "react";

const MessageContainer = ({messages}) => {
    const messageRef = useRef();
    let myUser = localStorage.getItem("user");
    const [messageClass, setMessageClass] = useState("user-message")

    
    useEffect(()=>{
        if(messageRef && messageRef.current){
            const {scrollHeight, clientHeight} = messageRef.current;
            messageRef.current.scrollTo({
                left: 0, top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    },[messages])
    return ( 
        <div ref={messageRef} className="message-container">
            {messages.map((m, i) => 
                <div key={i} className={m.user == myUser?"user-message":m.user == "MyChat Bot"? "bot-message":"other-message"}>
                    <div className={m.user == myUser?"message bg-primary":m.user == "MyChat Bot"?"message-bot":"message-other bg-secondary"}>{m.message}</div>
                    {m.user !== "MyChat Bot" && <div className="from-user">{m.user}</div>}
                </div>
            )}
        </div>
     );
}
 
export default MessageContainer;