import React, { useEffect } from 'react'

function Chat({ socket, username, room }) {

    const [currentMessage, setCurrentMessage] = React.useState("");

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (msgData) => {
            console.log(msgData);
        })
    }, [socket]);

  return (
    <div className="chat-room">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body"></div>
        <div className="chat-footer">
            <input type="text" placeholder="Say something..." onChange={(event) => setCurrentMessage(event.target.value)}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default Chat