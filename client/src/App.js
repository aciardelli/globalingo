import './App.css';
import Chat from './Chat';
import io from 'socket.io-client';
import { useState } from 'react';

const socket = io.connect('http://localhost:3001');

function App() {

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="sign-in">
          <h3>Join a Chat</h3>
          <input id="username" type="text" placeholder='Anthony...' onChange={(event) => {setUsername(event.target.value)}}/>
          <input id="roomid" type="text" placeholder='Room...' onChange={(event) => {setRoom(event.target.value)}}/>
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )};

    </div>
  );
}

export default App;
