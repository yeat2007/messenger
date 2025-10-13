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



  return(

  );
}

export default App;