import { create } from 'zustand';



type Message = {
    text: string;
    sent: boolean;
    time: Date;
}

type MessageStore = {
    messages: Record<string, Message[]>;
    addMessage: (userName: string, text: string, sent?: boolean) => void;
}
export const useMessageStore = create<MessageStore>((set) => ({
    messages: {
        "Vasya": [{text: "privet", sent: false, time:new Date("2025-10-29T10:23")}],
        "Werty": [{text  : "watsUP", sent: true, time:new Date("2025-10-29T10:23")}],
},
    addMessage: (userName, text, sent = true) => 
    set((state) => ({
        messages: {
            ...state.messages,
            [userName]: [
                ...(state.messages[userName] || []),
                { text, sent, time: new Date() }
            ]
        }
    }))
}));

