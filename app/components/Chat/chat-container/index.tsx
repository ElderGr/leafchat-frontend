import { Button, Col, Collapse, CollapseProps, Row, Space, Tabs, TabsProps } from "antd";
import { ChatItemList } from "../components/ChatItemList";
import Chat from "../components/Chat";
import { CloseOutlined, MessageFilled, PlusOutlined } from '@ant-design/icons'; 
import { useEffect, useState } from 'react'
import '../index.styles.css'
import { socket } from "@/app/config/socket/socket.io";
import { ChatsModel } from "@/app/domain/chats/chats.types";
import { NewChatItemList } from "../components/NewChatItemList";
import { useChatContext } from "@/app/context/chat";

export type SelectedChat = {
    id: string | null;
    type: 'existend' | 'inexistend';
    receiver?: string;
}

export function ChatContainer(){
    const { 
        selectedChat, 
        handleSelectChat, 
        handleCloseChat 
    } = useChatContext()

    const [chats, setChats] = useState<ChatsModel[]>([])

    useEffect(() => {
        socket.emit('chat_list')
    }, [])

    socket
        .on('chat_list', (chats: ChatsModel[]) => {
            setChats(chats)
        })
    
        const onChange = (key: string) => {
            console.log(key);
        };
          
    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: (
                <label>
                    <MessageFilled />
                    Conversas
                </label>
            ),
            children: chats.map((chat, index) => (
                <ChatItemList
                    key={index}
                    data={chat}
                    active={selectedChat?.id === chat.id}
                    handleSelectChat={() => handleSelectChat({
                        type: 'existend',
                        id: chat.id,
                        receiver: ''
                    })} 
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

    const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'Mensagens',
        children:  
            <Row>
                <Tabs 
                    style={{width: '100%'}} 
                    defaultActiveKey="1" 
                    items={tabItems} 
                    onChange={onChange} 
                />
            </Row>
    }];

    const chatMessages: CollapseProps['items'] = [
        {
            key: '1',
            label: selectedChat?.id,
            extra: (
                <Button type='text' htmlType="button" shape="circle">
                    <CloseOutlined onClick={() => handleCloseChat()} />
                </Button>
            ),
            children:  
            <div>
                <Chat />
            </div>
        }];
    

    console.log(selectedChat)
    
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