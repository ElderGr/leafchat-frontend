import { createContext, useContext, useState } from 'react';
import { ChatContextProps, ChatProviderProps, SelectedChat } from './types';

const ChatContext = createContext({} as ChatContextProps)

function ChatProvider(props: ChatProviderProps) {
    const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null)

    const handleSelectChat = ({
        type,
        id,
        participants,
        receiver
    }: SelectedChat) => {
        setSelectedChat({
            receiver,
            type,
            id,
            participants
        })
    }

    const handleCloseChat = () => {
        setSelectedChat(null)
    }

    return (
        <ChatContext.Provider value={{
            selectedChat,
            handleSelectChat,
            handleCloseChat
        }}>
            {props.children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
  return useContext(ChatContext);
}

export default ChatProvider;
