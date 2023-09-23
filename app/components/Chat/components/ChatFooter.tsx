import { Button, Col, Popover, Row, Input, Tooltip, Form, InputProps } from "antd";
import { AudioFilled, PlusOutlined, SendOutlined, CameraFilled, PaperClipOutlined } from '@ant-design/icons'; 
import { socket } from "@/app/config/socket/socket.io";
import { useAuthContext } from "@/app/context/auth";

type Props = {
  openAudioChat(): void;
  chat: string | null;
}

export function ChatFooter({
  chat,
  openAudioChat
}: Props){
    const [form] = Form.useForm()

    const { user } = useAuthContext()

    const content = (
        <Row style={{width: '200px'}}>
          <Col span={24}>
            <Button type='text' style={{width: '100%'}} ghost>
              <Row>
                <Col span={2}>
                  <CameraFilled />
                </Col>
                <Col style={{textAlign: 'start'}} offset={2} span={20}>
                  Câmera
                </Col>
              </Row>
            </Button>
          </Col>
          <Col span={24}>
            <Button type='text' style={{width: '100%'}} ghost>
              <Row>
                <Col span={2}>
                  <PaperClipOutlined />
                </Col>
                <Col style={{textAlign: 'start'}} offset={2} span={20}>
                  Fotos e vídeos
                </Col>
              </Row>
            </Button>
          </Col>
        </Row>
    );

    const handleSendMessage = () => {
      const message = form.getFieldValue('message')
      
      socket.emit('message_create', { 
        chatId: chat,
        content: message,
        contentType: 'text',
        owner: user?.id
       })
      
       form.resetFields()
    }

    const handleInputSubmit = (e: any) => {
      if(e.key === 'Enter'){
        handleSendMessage()
      }
    }

    return (
        <Row
            style={{marginTop: '10px'}}
        >
            <Col style={{ display: 'flex', alignItems: 'center' }} span={1}>
                <Popover 
                    placement='leftBottom' 
                    content={content}  
                    trigger="click"
                >
                    <Button htmlType='button' ghost shape='circle' type='text'>
                    <PlusOutlined />
                        </Button>
                    </Popover>
                </Col>
                <Col span={18} offset={2}>
                  <Form
                    form={form}
                  >
                    <Form.Item
                      name='message'
                    >
                      <Input
                        onKeyDown={handleInputSubmit}
                        placeholder="Digite uma mensagem"
                        suffix={
                        <Tooltip title="Extra information">
                            <SendOutlined 
                              onClick={handleSendMessage} 
                              style={{ color: 'rgba(0,0,0,.45)' }} 
                            />
                        </Tooltip>
                        }
                      />
                    </Form.Item>
                    
                  </Form>
                </Col>
                <Col offset={1} span={2}>
                <Tooltip title='Audio'>
                    <Button onClick={openAudioChat} type='primary' shape='circle' >
                    <AudioFilled />
                    </Button>
                </Tooltip>
            </Col>
        </Row>
    )
}