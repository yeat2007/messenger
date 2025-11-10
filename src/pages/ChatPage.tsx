import { Sidebar } from '../components/Sidebar';
import { ChatWindow } from '../components/ChatWindow';

const ChatPage = () => {
  return (
    <div className="mainBlock">
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

export default ChatPage;


