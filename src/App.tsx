import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import CallsPage from './pages/CallsPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/calls" element={<CallsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;