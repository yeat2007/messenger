import './App.css'
import { useState , useEffect} from 'react';
import { useMessageStore, type User } from './store/messageStore';


const Message = ({text, sent} : {text: string; sent: boolean }) => (
    <div className={`message ${sent ? "sent" : ""}`}>{text}</div>
);


const ChatItem = ({userName, userAvatar, userOnline, messageTime, userMessage }: User ) => {
  const setActiveUser = useMessageStore((s) => s.setActiveUser);

  return (
    <div className="chatList" 
         onClick = {() => setActiveUser({ userName, userAvatar, userOnline, messageTime, userMessage })}>
      <div className="chatItem">
        <img src = {userAvatar} className='avatar'></img>
        <div className="userInfo">
          <div className="chatTop">
            <span className="userName">{userName}</span>
            <span className="chatTime">{messageTime}</span>
          </div>
          {/* <div className="chatMessage">{userMessage}</div> */}
        </div>
      </div>
    </div>
  );
}


// type UsersProps = {
//   userName: string,
//   userMessage: string,
//   userAvatar?: string,
//   userOnline: boolean,
//   messageTime?: string,
//   lastMessage?: string,
// };


// const contacts: UsersProps[] = [
//   {
//     userName: "Vasya",
//     userMessage: "hello world('print')",
//     userAvatar: "https://placehold.co/50x50",
//     userOnline: true,
//     messageTime: "10:12",
//     lastMessage: "qwerty",
//   },

  
//   {
//     userName: "Werty",
//     userMessage: "bye",
//     userAvatar: "https://placehold.co/50x50",
//     userOnline: true,
//     messageTime: "12:12",
//     lastMessage: "",
//   },


//   {
//     userName: "GHJ",
//     userMessage: "ninja, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
//     userAvatar: "https://placehold.co/50x50",
//     userOnline: true,
//     messageTime: "20:12",
//     lastMessage: "!!!!!",
//   },
// ]




// type MessageProps = {
//   text: string;
//   sent: boolean;
// }




function App() {
  const {contacts, activeUser, messages, addMessage } = useMessageStore();
  const [newMessage, setNewMessage] = useState("");
  const [time, setTime] = useState("");
    useEffect(() => {
      const updateTime = () => {
        const now = new  Date();
        setTime(now.toLocaleTimeString([], {hour: '2-digit' , minute: '2-digit' }));
        }
    updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => { clearInterval(timer)};
} ,[]);

  // const allMessages = useMessageStore(state => state.messages);
  // const addMessage = useMessageStore(state => state.addMessage);

  // const messages = selectedChat ? allMessages[selectedChat.userName] || [] : []; 
  // const sendMessage = () => {
  //   if (!selectedChat || !newMessage.trim()) return;
  //   addMessage(selectedChat.userName, newMessage, true);
  //   setNewMessage("");
  // };



  // const [time, setTime] = useState<string>('');
  
 

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
          {contacts.map((c, i) => (<ChatItem key={i} {...c}/>
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
          {activeUser ? (
            <>
            <div className="chatWithUser">
              <div className="topbar">
                <div className="center">{activeUser.userName}</div>
              </div>
              <div className="messages">
                  {(messages[activeUser.userName] || []).map((m, i) => (
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
              onChange={(e) => setNewMessage(e.target.value)}/>\

            <button className="sendMess" 
              onClick={() =>{
                if(newMessage.trim()) {
                  addMessage(activeUser.userName, newMessage);
                  setNewMessage('');
                }
              }}>
              Send
            </button>
          </div>
       </>
      ) : (
        <div className = "messages">
            <p> Select User</p>
      </div>
      )}
    </div>
  </div>
 </div> 
  );
}

export default App;