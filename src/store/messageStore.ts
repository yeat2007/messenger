import { create } from 'zustand';



type Message = {
    text: string;
    sent: boolean;
}

type MessageStore = {
    messages: Message[];
    addMessage: (text: string, sent?: boolean) => void;
}
export const useMessageStore = create<MessageStore>((set) => ({
    messages: [
        {text: "privet", sent: false},
        {text  : "watsUP", sent: true},
        {text: "ninja", sent: false},
    ],
    addMessage:(text, sent = true ) =>
        set((state) => ({ 
            messages: [...state.messages, {text, sent}] 
        })), 
}));