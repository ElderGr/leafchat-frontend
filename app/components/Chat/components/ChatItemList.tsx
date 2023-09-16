import { Avatar, Badge, Col, Row } from "antd";
import { UserOutlined } from '@ant-design/icons';
import './index.styles.css'

type Props = {
    handleSelectChat(): void;
    active: boolean;
}

export function ChatItemList({
    handleSelectChat,
    active
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
            <Col offset={1} span={10}>
                eee
            </Col>
            <Col offset={9} span={1}>
                <Badge count={2} />
            </Col>
        </Row>
    )
}