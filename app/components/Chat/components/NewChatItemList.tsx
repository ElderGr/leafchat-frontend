import { useListUsers } from "@/app/domain/user/user.hook"
import { Avatar, Col, Row } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useChatContext } from "@/app/context/chat";
import { useCreateChat } from "@/app/domain/chats/chat.hook";
import { useAuthContext } from "@/app/context/auth";

export function NewChatItemList(){
    const { data } = useListUsers()
    const { user } = useAuthContext()
    const { handleSelectChat } = useChatContext()
    const createChat = useCreateChat()

    const handleNewChat = (selectedUser: string) => {
        createChat.mutateAsync({
            participants: [selectedUser, user?.id || '']
        }).then(res => {
            const { id, participants } = res.data
            handleSelectChat({
                id: id,
                participants: participants,
            })
        })
    }

    return (
        <div>
            {data?.map(currUser => currUser.id !== user?.id && (
                <Row
                    key={currUser.id}
                    onClick={() => handleNewChat(currUser.id)} 
                    className={`chat-container`}
                >
                    <Col span={2}>
                        <Avatar 
                            src={currUser.avatar_url} 
                            icon={<UserOutlined />} 
                        />
                    </Col>
                    <Col offset={1} span={10}>{currUser.name}</Col>
                </Row>
            ))}
        </div>
    )
}