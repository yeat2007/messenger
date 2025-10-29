import { useState , useEffect} from 'react';
import './App.css'
import { useMessageStore } from './store/messageStore';


type UsersProps = {
  userName: string,
  userMessage: string,
  userAvatar?: string,
  userOnline: boolean,
  messageTime?: string,
  lastMessage?: string,
};


const contacts: UsersProps[] = [
  {
    userName: "Vasya",
    userMessage: "hello world('print')",
    userAvatar: "https://placehold.co/50x50",
    userOnline: true,
    messageTime: "10:12",
    lastMessage: "qwerty",
  },

  
  {
    userName: "Werty",
    userMessage: "bye",
    userAvatar: "https://placehold.co/50x50",
    userOnline: true,
    messageTime: "12:12",
    lastMessage: "",
  },


  {
    userName: "GHJ",
    userMessage: "ninja, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    userAvatar: "https://placehold.co/50x50",
    userOnline: true,
    messageTime: "20:12",
    lastMessage: "!!!!!",
  },
]

const ChatItem = ({userName, userMessage, userAvatar, messageTime, onSelect }: UsersProps & { onSelect: () => void }) => {
  return (
    <div className="chatList" onClick = {onSelect}>
      <div className="chatItem">
        <img src = {userAvatar} className='avatar'></img>
        <div className="userInfo">
          <div className="chatTop">
            <span className="userName">{userName}</span>
            <span className="chatTime">{messageTime}</span>
          </div>
          <div className="chatMessage">{userMessage}</div>
        </div>
      </div>
    </div>
  );
}


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



function App() {
  const messages = useMessageStore((state) => state.messages);
  const addMesage = useMessageStore((state) =>state.addMessage);
  const [newMessage, setNewMessage ] = useState("")
  const sendMessage = () => {
    if(newMessage.trim()) {
      addMesage(newMessage, true)
      setNewMessage("");
    }
  };

    const [selectedChat, setSelectedChat] = useState<UsersProps | null>(null);

  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new  Date();
      const formattedTime = now.toLocaleTimeString([], {hour: '2-digit' , minute: '2-digit' })
      setTime(formattedTime)
      }
  updateTime();
  const timer = setInterval(updateTime, 1000);
  return () => { clearInterval(timer)};
} ,[]);

  return(
    <div className="mainBlock">
      <div className="navigation">
        <div id = "timeDisplay">{time}</div>
        <div className="messageTitle">
          <img src="src/assets/Messages.svg"/>
        </div>

        <div className="search">
          <input type="text" id="searchinput" placeholder="Search"/>
          <button id = "searchBtn">
            <img className="searchinput" src="src/assets/Search.svg"/>
          </button>
        </div>

        <div className="buttons">
          <button className="navBtn">All</button>
          <button className="navBtn">Groups</button>
          <button className="navBtn">All</button>
        </div>

        <div className="chatContainer">
          {contacts.map((contact, i) => (
            <ChatItem key={i} {...contact} onSelect = {() => setSelectedChat(contact)}/>
          ))}
        </div>
        <div className="btnsContainer">
          <div className="btns">
            <button className="bottomBtn">
              <img src="src/assets/Phone.svg" alt="phone" />
              <span>Calls</span>
            </button>
            <button className="bottomBtn">
              <img src="src/assets/Chat Message.svg" alt="chat" />
              <span>Chats</span>
            </button>
            <button className="bottomBtn">
              <img src="src/assets/Settings.svg" alt="settings" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      <div className="cardsContainer">
        <div className="mainCard">
          <div className="chatWithUser">
            <div className="topbar">
              <div className="left">
                <img src={selectedChat?.userAvatar} className="avatarSmall" />
              </div>
              <div className="center">
                <strong>{selectedChat?.userName || "select chat"}</strong>
              </div>
            </div>
            <div className="messages">
              {messages.map ((m, i) => (
                <Message key = {i} text = {m.text} sent = {m.sent}/>
                ))}
              <div className="gradientCircle"></div>
            </div>
          </div>

          <div className="messageType">
            <textarea
              className="typing"
              placeholder="Type a message ..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();}}}/>
            <button className="sendMess" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;