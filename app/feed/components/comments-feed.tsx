import { usePostContext } from "@/app/context/post";
import { Avatar, Col, Divider, Modal, Row } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useListComment } from "@/app/domain/comment/comment.hook";
import { calculateTimeAgo } from "@/app/helpers/date";

export function CommentFeed(){
    const {
        commentsOnPost,
        closeCommentsOnForm,
        selectedPost
    } = usePostContext()
    const { data } = useListComment({ post_id: selectedPost?.id }) 
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
            {data && data.map(comment => (
                <div key={comment.id}>
                    <Divider />
                    <Row>
                        <Col span={1}>
                            <Avatar src={comment?.User?.avatar_url} />
                        </Col>
                        <Col offset={1} span={20}>
                            <h5><b>{comment?.User?.name}</b></h5>
                            <p>{comment?.body}</p>
                            <span>{calculateTimeAgo(comment?.create_at.toString())}</span>
                        </Col>
                    </Row>
                </div>
            ))}
        </Modal>
    )
}