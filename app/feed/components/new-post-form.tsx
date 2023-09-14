import { usePostContext } from "@/app/context/post";
import { Form, Modal, Input, Row, Button, Col, Upload } from "antd"; 
import { UploadOutlined } from '@ant-design/icons'
import { useCreatePost } from "@/app/domain/post/post.hook";

export function NewPostForm(){
    const { newPostForm, closeNewPostForm } = usePostContext()
    const createPost = useCreatePost()
    const [form] = Form.useForm()

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
        createPost.mutateAsync(formData)
            .then(res => {
                form.resetFields()
                closeNewPostForm()
            })
            .catch(() => console.log('error'))
    }
      
    return(
        <Modal
            title="Adicionar novo post"
            centered
            open={newPostForm}
            onCancel={closeNewPostForm}
            footer={[
                <Row key='options'>
                    <Col offset={20} span={2}>
                        <Button onClick={() => form.submit()} size="large" type="primary">Postar</Button>
                    </Col>
                </Row>
            ]}
        >
            <Form
                onFinish={handleFinish}
                form={form}
            >
                <Form.Item
                    name='title'
                >
                    <Input 
                        placeholder="Titulo"
                    />
                </Form.Item>
                <Form.Item
                    name='description'
                >
                    <Input.TextArea 
                        placeholder="Descrição"
                        rows={6}
                        style={{resize: 'none'}}
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