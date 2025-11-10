import { create } from 'zustand';



export type Message = {
    text: string;
    sent: boolean;
};

export type User = {
  userName: string,
  userMessage: string,
  userAvatar?: string,
  userOnline: boolean,
  messageTime?: string,
  lastMessage?: string,
};


type MessageStore = {
    contacts: User[];
    activeUser: User | null;
    messages: Record<string, Message[]>;
    setActiveUser:(user: User) => void;
    addMessage: (userName: string, text: string, sent?: boolean) => void;
}
export const useMessageStore = create<MessageStore>((set, get) => ({
    contacts: [
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
        lastMessage: "yo",
    },

    {
        userName: "GHJ",
        userMessage: "ninja, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        userAvatar: "https://placehold.co/50x50",
        userOnline: true,
        messageTime: "20:12",
        lastMessage: "!!!!!",
    },
],

    activeUser: null,



    messages: {
        "Vasya": [{text: "privet", sent: false }],
        "Werty": [{text  : "watsUP", sent: true }],
},

    setActiveUser: (user) => {console.log('setActiveUser', user); set({activeUser: user})},
    addMessage: (userName, text, sent = true) => {
        const { messages } = get();
        const userMessages = messages[userName] || [];
        const updatedMessages = {
            ...messages, 
            [userName]: [...userMessages, {text, sent}],
        };
        set({ messages: updatedMessages });
    },
}));

