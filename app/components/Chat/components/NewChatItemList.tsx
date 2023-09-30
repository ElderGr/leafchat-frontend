import { useListUsers } from "@/app/domain/user/user.hook"
import { Avatar, Col, Row } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useChatContext } from "@/app/context/chat";

export function NewChatItemList(){
    const { data } = useListUsers()
    const { handleSelectChat } = useChatContext()

    return (
        <div>
            {data?.map(user => (
                <Row
                    key={user.id}
                    onClick={() => {
                        handleSelectChat({
                            receiver: user.id,
                            type: 'inexistend',
                        })
                    }} 
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