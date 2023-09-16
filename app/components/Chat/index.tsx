import { Button, Collapse, CollapseProps, Space } from "antd";
import { ChatItemList } from "./components/ChatItemList";
import Chat from "./components/Chat";
import { CloseOutlined } from '@ant-design/icons'; 
import { useState } from 'react'
import './index.styles.css'

export function ChatContainer(){
    const [selectedChat, setSelectedChat] = useState<string | null>(null)

    const chats = Array.from({length: 20}, (_, index) => {
        return {
            id: `${index}-absc`
        }
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
                    active={selectedChat === chat.id}
                    handleSelectChat={() => setSelectedChat(chat.id)} 
                />
            ))}
        </div>
    }];

    const chatMessages: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Ednaldo Pereira',
            extra: (
                <Button type='text' htmlType="button" shape="circle">
                    <CloseOutlined onClick={() => setSelectedChat(null)} />
                </Button>
            ),
            children:  
            <div>
                <Chat />
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
                        style={{
                            width: '400px'
                        }}
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