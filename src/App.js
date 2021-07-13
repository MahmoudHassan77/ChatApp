import { useState } from 'react';
import Lobby from './components/Lobby';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr'


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './components/Chat';


function App() {
  const [connection, setConnection] = useState();
  const [messages, setmessages] = useState([]);
  const [users, setUsers] = useState([]);
  const joinRoom = async(user, room) => {
    localStorage.setItem('user', user);
    try{
      const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:9090/chat")
      .configureLogging(LogLevel.Information)
      .build();

      connection.on("UsersInRoom",(users)=>{
        setUsers([...users]);
      })

      connection.on("ReceiveMessage",(user,message)=>{
       setmessages(messages => [...messages,{user,message}]);
      });

      connection.onclose(e=>{
        setConnection();
        setmessages([]);
        setUsers([]);
      })

      await connection.start();
      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);
    }catch(e){
      console.log(e)
    }
  }

  const closeConnection = async () =>{
    localStorage.removeItem("user");
    try{
      await connection.stop();
    } catch(e){
      console.log(e);
    }
  }

  const sendMessage=async(message)=>{
    try{
      await connection.invoke("SendMessage", message)
    } catch(e){
      console.log(e);
    }
  }

  return (
    <div className="app">
      <h2>My Chat</h2>
      <hr className="line" />
      {!connection
       ? <Lobby joinRoom={joinRoom} />
       : <Chat messages={messages} sendMessage={sendMessage}
        closeConnection={closeConnection} users={users} />
      }
    </div>
  );
}

export default App;

