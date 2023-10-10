import { usePostContext } from "@/app/context/post";
import { Avatar, Input, Button, Col, Divider, Form, Modal, Row, Upload, List, Image } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useCreateComment, useListComment } from "@/app/domain/comment/comment.hook";
import { calculateTimeAgo } from "@/app/helpers/date";
import { UploadOutlined } from '@ant-design/icons'

export function CommentFeed() {
    const {
        commentsOnPost,
        closeCommentsOnForm,
        selectedPost
    } = usePostContext()

    const { data, refetch } = useListComment({ post_id: selectedPost?.id })

    const [form] = Form.useForm();
    const createComment = useCreateComment();

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            console.log(e)
            return e;
        }

        console.log(e?.fileList)
        return e?.fileList;
    };

    const dummyRequest = ({ file, onSuccess }: any) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleFinish = (formData: any) => {
        formData.postId = selectedPost?.id
        createComment.mutateAsync(formData)
            .then(res => {
                form.resetFields();
                refetch();
            })
            .catch(() => console.log('error'))
    }

    return (
        <Modal
            title=""
            open={commentsOnPost}
            onCancel={closeCommentsOnForm}
            footer={[
                <Row key='options'>
                    <Col offset={20} span={2}>
                        <Button onClick={() => form.submit()} size="large" type="primary">Comentar</Button>
                    </Col>
                </Row>
            ]}
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
                            <p>{comment?.Comments_files[0]?.link}</p>
                            <Col span={24}>
                                {comment?.Comments_files.length > 0 && (
                                    <List
                                        grid={{ gutter: 16, column: 4 }}
                                        dataSource={comment?.Comments_files}
                                        renderItem={(item) => (
                                            <Image
                                                key={item.id}
                                                src={item.link}
                                                alt='image'
                                                width={200}
                                                height={200}
                                            />
                                        )}
                                    />
                                )}
                            </Col>
                            <span>{calculateTimeAgo(comment?.create_at.toString())}</span>
                        </Col>
                    </Row>
                </div>
            ))}
            <Form
                onFinish={handleFinish}
                form={form}
            >
                <Form.Item
                    name="content"
                >
                    <Input.TextArea
                        placeholder="Escreva um comentário"
                        style={{ resize: 'none' }}
                    />
                </Form.Item>
                <Form.Item
                    name="files"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" customRequest={dummyRequest} listType="picture">
                        <Button icon={<UploadOutlined />}>Anexar arquivo</Button>
                    </Upload>
                </Form.Item>
            </Form>


        </Modal>
    )
}