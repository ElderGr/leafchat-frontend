'use client'
import { Button, Col, Divider, Row } from "antd";
import { Aside } from "./aside";
import { Feed } from "./feed";
import { usePostContext } from "@/app/context/post";
import { CommentFeed } from "./comments-feed";
import { NewPostForm } from "./new-post-form";

export default function FeedContainer() {

    const { openNewPostForm } = usePostContext()

    return (
        <Row>
            <Col span={24}>
                <Button size="large" type="primary" onClick={openNewPostForm}>
                    Adicionar post
                </Button>
                <CommentFeed />
                <NewPostForm />
            </Col>
            <Col span={17}>
                <Divider />
                <Feed />
            </Col>
            <Col offset={1} span={6}>
                <Aside />
            </Col>
        </Row>
    )
}