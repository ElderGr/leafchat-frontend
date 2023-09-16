import { Button, Col, Popover, Row, Input, Tooltip } from "antd";
import { AudioFilled, PlusOutlined, SendOutlined, CameraFilled, PaperClipOutlined } from '@ant-design/icons'; 

type Props = {
  openAudioChat(): void;
}

export function ChatFooter({
  openAudioChat
}: Props){
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
                <Input
                    placeholder="Digite uma mensagem"
                    suffix={
                    <Tooltip title="Extra information">
                        <SendOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                    }
                />
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