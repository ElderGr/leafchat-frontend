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
            {data?.map(user => (
                <Row
                    key={user.id}
                    onClick={() => handleNewChat(user.id)} 
                    className={`chat-container`}
                >
                    <Col span={2}>
                        <Avatar 
                            icon={<UserOutlined />}
                        />
                    </Col>
                    <Col offset={1} span={10}>{user.name}</Col>
                </Row>
            ))}
        </div>
    )
}