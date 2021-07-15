import { useState } from "react";
import { FormControl, InputGroup, Form, Button } from "react-bootstrap"

const SendMessageForm = ({sendMessage}) => {
    const [message,setMessage]= useState("");
    return ( 
        <Form onSubmit={e=>{
            e.preventDefault();
            sendMessage(message);
            setMessage("");
        }}>
            <div className="sendCont">
            <FormControl placeholder="message..."
             onChange={e=>setMessage(e.target.value)}
             value={message} />
                <Button variant="dark"
                 type="submit"
                 disabled={!message}
                 >Send</Button>
            </div>
        </Form>
     );
}
 
export default SendMessageForm;