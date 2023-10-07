import { Avatar, Badge, Col, Row } from "antd";
import { UserOutlined } from '@ant-design/icons';
import './index.styles.css'
import { ChatsModel } from "@/app/domain/chats/chats.types";
import { useListUsers } from "@/app/domain/user/user.hook";
import { useAuthContext } from "@/app/context/auth";
import { useEffect, useState } from "react";
import { User } from "@/app/domain/user/user.types";

type Props = {
    handleSelectChat(): void;
    active: boolean;
    chat?: ChatsModel
}

export function ChatItemList({
    handleSelectChat,
    active,
    chat
}: Props){
    const { user } = useAuthContext()
    const { data } = useListUsers({
        id: chat ? chat.participants : []
    })

    return (
        <Row 
            onClick={handleSelectChat} 
            className={`chat-container ${active ? 'chat-active' : ''}`}
        >
            <Col span={2}>
                <Avatar 
                    src={data?.find(currUser => currUser.id !== user?.id)?.avatar_url}
                    icon={<UserOutlined />} 
                />
            </Col>
            <Col offset={1} span={10}>
                {data?.map(currUser => currUser.id !== user?.id && currUser.name)}
            </Col>
            <Col offset={9} span={1}>
                <Badge count={2} />
            </Col>
        </Row>
    )
}