import { useListUsers } from "@/app/domain/user/user.hook"
import { Avatar, Col, Row } from "antd"
import { UserOutlined } from '@ant-design/icons';

type Props = {
    openChat(id: string): void;
}

export function NewChatItemList({
    openChat
}: Props){
    const { data } = useListUsers()

    return (
        <div>
            {data?.map(user => (
                <Row
                    key={user.id}
                    onClick={() => openChat(user.id)} 
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