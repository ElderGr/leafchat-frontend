'use client'
import { Button, Col, Row } from "antd";
import { DeleteOutlined, SendOutlined, PauseCircleOutlined, AudioOutlined} from '@ant-design/icons'; 
import { useStopwatch } from 'react-timer-hook';
import { useEffect } from "react";
import { useCreateMessage } from "@/app/domain/messages/messages.hook";
import { useAuthContext } from "@/app/context/auth";

type Props = {
    openAudioChat(): void;
    chat: string | null;
}

let chunks: any = [];
let mediaRecorder: any = null

export function ChatFooterAudio({
    openAudioChat,
    chat
}: Props){

    const createMessage = useCreateMessage()
    const { user } = useAuthContext()

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia supported.");
            navigator.mediaDevices
                .getUserMedia({ audio: true, })
                .then(handleAudioRecord)
                .catch((err) => {
                    console.error(`The following getUserMedia error occurred: ${err}`);
                }
            );
        } else {
            console.log("getUserMedia not supported on your browser!");
        }
    }, [])

    const handleAudioRecord = (stream: any) => {
        console.log(stream)
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start(1000);
        console.log(mediaRecorder.state);
        console.log("recorder started");  

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
        };
    }

    const handleAudioStop = () => {
        console.log(mediaRecorder)
        if(mediaRecorder) mediaRecorder.stop()
        
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];

        if(!chat || !user){
            console.log('erro no envio')
            return 
        }

        createMessage.mutateAsync({
            chatId: chat,
            content: blob,
            contentType: 'audio',
            owner: user.id
        })
        handleCancelAudio()
    }

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
                <Button 
                    onClick={handleAudioStop}
                    size="large" 
                    type='text' 
                    ghost 
                    shape="circle"
                >
                    <SendOutlined />
                </Button>
            </Col>
        </Row>
    )
}