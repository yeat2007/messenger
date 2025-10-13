import { useState } from 'react';
import './App.css'

type MessageProps = {
  text: string;
  sent: boolean;
}

const Message = ({text, sent}: MessageProps) => {
  return ( 
    <div className={`message ${sent ? "sent" : ""}`}>
      {text}
    </div>
  );
}

type ChatItemProps = {
  name: string;
  time: string;
  message: string;
}
const ChatItem = ({name, time, message }: ChatItemProps) => {
  return (
    <div className="chatList">
      <div className="chatItem">
        <img src="https://placehold.co/50x50" className="avatar" alt={name}/>
        <div className="userInfo">
          <div className="chatTop">
            <span className="userName">{name}</span>
            <span className="chatTime">{time}</span>
          </div>
          <div className="chatMessage">{message}</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([
    {text: "privet", sent: false},
    {text: "watsUP", sent: true},
    {text: "ninja ", sent: false},
  ]);
  const [newMessage, setNewMessage] = useState("");
  const typeSend = () => {
    if(newMessage.trim()){
      setMessages([...messages,
        {text: newMessage, sent: true }
      ]);
      setNewMessage("");
    }
  };
  const chats = [
    {name: "user", time: "10:34", message: "hello"},
    {name: "qwerty", time: "14:09", message: "ninjajajajaja"},
    {name: "usasder", time: "19:12", message: "helasdasdasdlo"},
  ]

  return(
    <div className="mainBlock">
      <div className="navigation">
        <div className="chatContainer">
          {chats.map((chat, i) => (
            <ChatItem
              key={i}
              name={chat.name}
              time={chat.time}
              message={chat.message}/>
          ))}
        </div>
      </div>

      <div className="cardsContainer">
        <div className="mainCard">
          <div className="chatWithUser">
            <div className="messages">
              {messages.map((m, i) => (
                <Message key={i} text={m.text} sent={m.sent}/>
              ))}
            </div>
          </div>

          <div className="messageType">
            <textarea
              className="typing"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}/>
            <button className="sendMess" onClick={typeSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
