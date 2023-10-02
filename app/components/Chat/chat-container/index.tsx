import { Space } from "antd";
import '../index.styles.css'
import { useChatContext } from "@/app/context/chat";
import { ChatListContainer } from "../chats-lists-container";
import { IndividualChatContainer } from "../individual-chat";

export function ChatContainer(){
    const { 
        selectedChat,
    } = useChatContext()
    
    return(
        <div style={{
            position: 'fixed',
            right: '20px',
            bottom: '0px',
        }}>
            <Space align="end">
                {selectedChat && (
                    <IndividualChatContainer />
                )}
                <ChatListContainer />
            </Space>
        </div>
    )
}