import React, { useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket, username, room }) {

    const [currentMessage, setCurrentMessage] = React.useState("");
    const [messageList, setMessageList] = React.useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (msgData) => {
            setMessageList((list) => [...list, msgData]);
        })
    }, [socket]);

  return (
    <div className="chat-room">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                    return (
                    <div className="message" id={username === messageContent.author ? "you" : "other"}>
                        <div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                    );
                })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text" value={currentMessage} placeholder="Say something..." onChange={(event) => setCurrentMessage(event.target.value)} onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default Chat