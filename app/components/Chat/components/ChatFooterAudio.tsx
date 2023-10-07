'use client'
import { Button, Col, Row } from "antd";
import { DeleteOutlined, SendOutlined, PauseCircleOutlined, AudioOutlined} from '@ant-design/icons'; 
import { useStopwatch } from 'react-timer-hook';
import { useEffect } from "react";
import { useCreateMessage } from "@/app/domain/messages/messages.hook";
import { useAuthContext } from "@/app/context/auth";
import { useChatContext } from "@/app/context/chat";
import { useNotification } from "@/app/hooks";

type Props = {
    openAudioChat(): void;
}

let chunks: Blob[] = [];
let mediaRecorder: MediaRecorder
let localStream: MediaStream

export function ChatFooterAudio({
    openAudioChat,
}: Props){

    const createMessage = useCreateMessage()
    const { selectedChat } = useChatContext()
    const notification = useNotification()

    const { user } = useAuthContext()

    useEffect(() => {
        handleBrowserMediaDevice()
    }, [])

    const handleBrowserMediaDevice = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ audio: true, })
                .then(handleAudioRecord)
                .catch((err) => {
                    notification.error({
                        message: `Erro ao tentar lidar com o seguinte recurso: ${err}`
                    });
                }
            );
        } else {
            notification.error({
                message: 'Seu navegador não suporta o recurso de audio'
            });
        }
    }

    const handleAudioRecord = (stream: MediaStream) => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start(1000);  

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
        };

        localStream = stream
    }

    const handleAudioSend = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        chunks = [];

        if(!selectedChat || !user){
            notification.error({
                message: 'Erro no envio do audio'
            })
            return 
        }
        
        createMessage.mutateAsync({
            chatId: selectedChat.id || '',
            content: blob,
            contentType: 'audio',
            owner: user.id,
        })
        
        handleCancelAudio()
    }

    const handleStopAudioTracks = () => {
        if(localStream) localStream.getAudioTracks()[0].stop();
    }

    const handleCancelAudio = () => {
        handleStopAudioTracks()
        reset()
        openAudioChat()
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
                    onClick={handleAudioSend}
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