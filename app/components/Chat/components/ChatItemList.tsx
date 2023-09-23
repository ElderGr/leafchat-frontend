import { Avatar, Badge, Col, Row } from "antd";
import { UserOutlined } from '@ant-design/icons';
import './index.styles.css'
import { ChatsModel } from "@/app/domain/chats/chats.types";

type Props = {
    handleSelectChat(): void;
    active: boolean;
    data: ChatsModel
}

export function ChatItemList({
    handleSelectChat,
    active,
    data
}: Props){
    return (
        <Row 
            onClick={handleSelectChat} 
            className={`chat-container ${active ? 'chat-active' : ''}`}
        >
            <Col span={2}>
                <Avatar 
                    icon={<UserOutlined />}
                />
            </Col>
            <Col offset={1} span={10}>{data.id}</Col>
            <Col offset={9} span={1}>
                <Badge count={2} />
            </Col>
        </Row>
    )
}