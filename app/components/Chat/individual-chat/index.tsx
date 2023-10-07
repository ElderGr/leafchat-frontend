import { Button, Collapse, CollapseProps } from "antd";
import Chat from "../components/Chat";
import { CloseOutlined } from '@ant-design/icons'; 
import '../index.styles.css'
import { useChatContext } from "@/app/context/chat";
import { useListUsers } from "@/app/domain/user/user.hook";
import { useAuthContext } from "@/app/context/auth";

export function IndividualChatContainer(){
    const { 
        selectedChat,
        handleCloseChat 
    } = useChatContext()

    const { user } = useAuthContext()

    const { data } = useListUsers({
        id: selectedChat?.participants || []
    })

    const chatMessages: CollapseProps['items'] = [
        {
            key: '1',
            label: data?.find(currUser => currUser.id !== user?.id)?.name,
            extra: (
                <Button 
                    onClick={handleCloseChat} 
                    type='text' 
                    htmlType="button"
                    shape="circle"
                >
                    <CloseOutlined />
                </Button>
            ),
            children:  
            <div>
                <Chat />
            </div>
    }];

    return(
        <Collapse
            defaultActiveKey={['1']}
            items={chatMessages}
            className="individual-chat-container"
        />
    )
}