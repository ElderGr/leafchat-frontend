import { usePostContext } from "@/app/context/post";
import { Avatar, Col, Divider, Modal, Row } from "antd";
import { UserOutlined } from '@ant-design/icons';

export function CommentFeed(){
    const { 
        commentsOnPost, 
        closeCommentsOnForm,
        selectedPost
    } = usePostContext()

    return(
        <Modal
            title=""
            open={commentsOnPost}
            onCancel={closeCommentsOnForm}
            footer={[]}
            width={800}
        >
            <h2>{selectedPost?.title}</h2>
            <p>
                {selectedPost?.description}
            </p>
            <div>
                <Divider />
                <Row>
                    <Col span={1}>
                        <Avatar icon={<UserOutlined />} />
                    </Col>
                    <Col offset={1} span={20}>
                        <p>{'post.title'}</p>
                    </Col>
                </Row>
            </div>
      </Modal>
    )
}