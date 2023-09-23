import { Button, Collapse, CollapseProps, Space } from "antd";
import { ChatItemList } from "./components/ChatItemList";
import Chat from "./components/Chat";
import { CloseOutlined } from '@ant-design/icons'; 
import { useEffect, useState } from 'react'
import './index.styles.css'
import { socket } from "@/app/config/socket/socket.io";
import { ChatsModel } from "@/app/domain/chats/chats.types";

export function ChatContainer(){
    const [selectedChat, setSelectedChat] = useState<string | null>(null)
    const [chats, setChats] = useState<ChatsModel[]>([])

    useEffect(() => {
        socket.emit('chat_list')
    }, [])

    socket
        .on('chat_list', (chats: ChatsModel[]) => {
            setChats(chats)
        })

    const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'Mensagens',
        children:  
        <div>
            {chats.map((chat, index) => (
                <ChatItemList
                    key={index}
                    data={chat}
                    active={selectedChat === chat.id}
                    handleSelectChat={() => setSelectedChat(chat.id)} 
                />
            ))}
        </div>
    }];

    const chatMessages: CollapseProps['items'] = [
        {
            key: '1',
            label: selectedChat,
            extra: (
                <Button type='text' htmlType="button" shape="circle">
                    <CloseOutlined onClick={() => setSelectedChat(null)} />
                </Button>
            ),
            children:  
            <div>
                <Chat 
                    chat={selectedChat}
                />
            </div>
        }];

    return(
        <div style={{
            position: 'fixed',
            right: '20px',
            bottom: '0px',
        }}>
            <Space align="end">
                {selectedChat && (
                    <Collapse
                        defaultActiveKey={['1']}
                        style={{ width: '400px' }}
                        items={chatMessages}
                    />
                )}
                <Collapse
                    style={{
                        width: '400px',
                        maxHeight: '50vh',
                    }}
                    items={items}
                    className="chat-list"
                />
            </Space>
            
        </div>
    )
}