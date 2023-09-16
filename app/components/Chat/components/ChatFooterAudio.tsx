'use client'
import { Button, Col, Row } from "antd";
import { DeleteOutlined, SendOutlined, PauseCircleOutlined, AudioOutlined} from '@ant-design/icons'; 
import { useStopwatch } from 'react-timer-hook';

type Props = {
    openAudioChat(): void;
}

export function ChatFooterAudio({
    openAudioChat
}: Props){

    const {
        seconds,
        minutes,
        hours,
        reset,
        isRunning,
        pause,
        start
    } = useStopwatch({ autoStart: true })

    const handleCancelAudio = () => {
        reset()
        openAudioChat()
    }

    return (
        <Row style={{marginTop: '10px'}} justify='end'>
            <Col span={2}>
                <Button size="large" onClick={handleCancelAudio} type='text' ghost shape="circle">
                    <DeleteOutlined />
                </Button>
            </Col>
            <Col span={2} offset={1}>
                <Button size="large" onClick={() => isRunning ? pause() : start()} type='text' ghost shape="circle">
                    {isRunning ? <PauseCircleOutlined /> : <AudioOutlined />}
                </Button>
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} span={5} offset={1}>
                {`
                    ${hours.toString().padStart(2, '0')}:
                    ${minutes.toString().padStart(2, '0')}:
                    ${seconds.toString().padStart(2, '0')}
                `}
            </Col>
            <Col span={2} >
                <Button size="large" type='text' ghost shape="circle">
                    <SendOutlined />
                </Button>
            </Col>
        </Row>
    )
}