import { Avatar, Badge, Col, Row } from "antd";
import { UserOutlined } from '@ant-design/icons';
import './index.styles.css'

export function ChatItemList(){
    return (
        <Row className="chat-container">
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