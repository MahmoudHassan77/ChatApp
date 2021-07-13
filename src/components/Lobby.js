import React,{useState} from 'react';
import {Button, Form} from 'react-bootstrap';

const Lobby = ({joinRoom}) => {
    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");
    return ( 
    <Form className="lobby"
        onSubmit={e=>{
            e.preventDefault();
            joinRoom(user, room);
        }}
    >
        <Form.Group>
            <label htmlFor="name">Name</label>
            <Form.Control placeholder='name' name="name" onChange={e=>setUser(e.target.value)} />
            <label htmlFor="room">Room</label>
            <Form.Control placeholder='room' name="room" onChange={e=>setRoom(e.target.value)} />
        </Form.Group>
        <Button variant="success" type="submit" disabled={!user || !room}>Join</Button>
    </Form>
     );
}
 
export default Lobby;