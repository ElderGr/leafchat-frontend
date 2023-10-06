import { Tabs, TabsProps } from "antd";
import { ChatItemList } from "../components/ChatItemList";
import { MessageFilled, PlusOutlined } from '@ant-design/icons'; 
import { useEffect, useState } from 'react'
import '../index.styles.css'
import { socket } from "@/app/config/socket/socket.io";
import { ChatsModel } from "@/app/domain/chats/chats.types";
import { NewChatItemList } from "../components/NewChatItemList";
import { useChatContext } from "@/app/context/chat";
import { useAuthContext } from "@/app/context/auth";

export function ChatListTabs(){
    const { 
        selectedChat, 
        handleSelectChat,
    } = useChatContext()
    
    const { user } = useAuthContext()

    const [chats, setChats] = useState<ChatsModel[]>([])

    useEffect(() => {
        socket.emit('chat_list', {
            participants: [user?.id]
        })
    }, [user?.id])

    socket
        .on('chat_list', (chats: ChatsModel[]) => {
            setChats(chats)
        })
        
    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: (
                <label>
                    <MessageFilled />
                    Conversas
                </label>
            ),
            children: chats.map((chat) => (
                <ChatItemList
                    key={chat.id}
                    chat={chat}
                    active={selectedChat?.id === chat.id}
                    handleSelectChat={() => handleSelectChat(chat)} 
                />
            )),
        },
        {
            key: '2',
            label: (
                <label>
                    <PlusOutlined />
                    Nova conversa
                </label>
            ),
            children: <NewChatItemList />,
        },
    ];
    return (
        <Tabs 
            style={{width: '100%'}} 
            defaultActiveKey="1" 
            items={tabItems} 
        />
    )
}