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
    <div className="chat-list">
      <div className="chat-item">
        <img src="https://placehold.co/50x50" className="avatar" alt={name} />
        <div className="user-info">
          <div className="chat-top">
            <span className="user-name">{name}</span>
            <span className="chat-time">{time}</span>
          </div>
          <div className="chat-message">{message}</div>
        </div>
      </div>
    </div>
  );

}





function App() {
  const [messages, setMessages] = useState([
    {text: "privet nigga", sent: false},
    {text: "watsUP", sent: true},

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
              message={chat.message}
            />
          ))}
        </div>
      </div>

      <div className="cardsContainer">
        <div className="main-card">
          <div className="chatWithUser">
            <div className="messages">
              {messages.map((m, i) => (
                <Message key={i} text={m.text} sent={m.sent} />
              ))}
            </div>
          </div>

          <div className="message-type">
            <textarea
              className="typing"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
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