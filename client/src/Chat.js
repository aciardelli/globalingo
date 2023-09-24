import React, { useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import translate from 'translate';

function Chat({ socket, username, room, language }) {

    const [currentMessage, setCurrentMessage] = React.useState("");
    const [messageList, setMessageList] = React.useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                language: language,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", async (msgData) => {
            console.log(msgData);
            console.log("Language from: " + msgData.language);
            console.log("Language to: " + language);
            await translate(msgData.message, { from: msgData.language, to: language }).then(text => {
                msgData.message = text;
            });
          setMessageList((list) => [...list, msgData]);
        })

        return () => {
            socket.off("receive_message");
        }
      }, [socket, language]);

  return (
    <div className="chat-room">
        <div className="chat-header">
            <h1>Globalingo</h1>
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