import React from "react";
import { MDBModal, MDBInputGroup } from "mdbreact";

import {
    FaShare,
    FaMicrophone,
    FaTimes,
    FaImage,
    FaCheck,
    FaFile,
    FaVideo,
} from "react-icons/fa";

import io from "socket.io-client";
import { parseJwt } from "../services/auth";
import api from "../services/api";

import ReactMediaRecorder from "@getapper/react-media-recorder";

import UnixToUTCHour from "../functions/UnixToUTCHour";
import "./chatContainer.css";

export default class ChatContainer extends React.Component {
    constructor(props) {
        super();
        this.state = {
            file: '',
            fileType: '',
            filePreview: '',
            messageInput: '',
            audio: false,
            sendAudio: false,
            interval: null,
            minutes: 0,
            seconds: 0
        }
    }

    chatContainer = React.createRef();

    async componentDidMount() {
        const socket = io('http://localhost:5000', {
            query: { user: parseJwt().id }
        });

        socket.on('new chat', (chat) => {
            this.props.reloadChat(chat);
        })

        socket.on('chat message', (msg) => {
            this.props.addMessage(msg);
        })
    }

    handleMenssage = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("image", this.state.file)
        data.append("content", JSON.stringify({
            content: this.state.messageInput,
            owner: parseJwt(),
            type: this.state.fileType === 'video/mp4' ? 'video' : 'image',
            receiver: this.props.user
        }))

        if (this.props.selectedChat.id === undefined) {
            await api.post('/chat', data);
        } else {
            await api.post(`/message/${this.props.selectedChat.id}`, data);
        }

        this.setState({
            messageInput: '',
            file: '',
            filePreview: '',
            fileType: ''
        },
            () => this.scrollToMyRef()
        );
    }

    scrollToMyRef = () => {
        const scroll =
            this.chatContainer.current.scrollHeight -
            this.chatContainer.current.clientHeight;
        this.chatContainer.current.scrollTo(0, scroll);
    };

    render() {
        const { modalChat, closeModal, user } = this.props;

        return (
            <MDBModal isOpen={modalChat} toggle={closeModal} fullHeight position="right">
                <form className='form__modal' enctype="multipart/form-data" onSubmit={this.handleMenssage}>
                    <div className='modal-header d-flex flex-column align-items-end' style={{ background: '#f0f0f0' }} >
                        <FaTimes onClick={closeModal} className='close-icon__modal-header' />
                        <div className='col-12 d-flex'>
                            <div className='image-container'></div>
                            <h4 className='col-7 title__modal-header'>
                                {user.name}
                            </h4>
                            <div className='col-2 image-icon-container__modal-header'>
                                <label className='image-icon__modal-header' htmlFor='chatFile' >
                                    <FaImage />
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className={`file-preview-container__modal ${this.state.filePreview !== '' ? 'preview_visible' : 'preview_invisible'}`}>
                        <div className='file-preview-header__modal'>
                            <FaTimes className='close-icon__modal-header' onClick={() => this.setState({ filePreview: '', file: '' })} />
                            <div className='file-preview-title__modal'>Pré-visualização</div>
                        </div>
                        <div className='file-preview-image__modal'>
                            {
                                this.state.fileType.indexOf('image') === -1 ?
                                    (
                                        <video controls autoPlay>
                                            <source src={this.state.fileType === '' ? '' : window.URL.createObjectURL(this.state.file)} />
                                        </video>
                                    )
                                    :
                                    (
                                        <img src={this.state.filePreview} alt='imagem de mensagem' />
                                    )
                            }
                        </div>
                    </div>


                    <div ref={this.chatContainer} className='body__modal'>
                        {this.props.selectedChat.messages !== undefined &&
                            this.props.selectedChat.messages.map((item, index) =>
                                item.owner.id === parseJwt().id ?
                                    (
                                        <div key={index} className='message__modal owner'>

                                            {item.type === 'audio' ? (
                                                <>
                                                    <audio src={item.content} controls />
                                                    <span className='message-data-span-owner__modal'>
                                                        {UnixToUTCHour(item.timestamp)}
                                                    </span>
                                                </>
                                            ) :
                                                (
                                                    <>
                                                        {item.image !== '' && item.image !== undefined && (
                                                            <>
                                                                {item.type === 'video' ?
                                                                    (
                                                                        <video style={{width: '100%'}} controls>
                                                                            <source src={item.image} type='video/mp4' />
                                                                        </video>
                                                                    )
                                                                    :
                                                                    (
                                                                        <img style={{ width: '100%' }} src={item.image} alt='imagem de mensagem' />
                                                                    )
                                                                }
                                                            </>
                                                        )}

                                                        <div className='message-content__modal__owner'>
                                                            {item.content}
                                                        </div>
                                                        <span className='message-data-span-owner__modal'>
                                                            {UnixToUTCHour(item.timestamp)}
                                                        </span>
                                                    </>
                                                )
                                            }

                                        </div>
                                    )
                                    :
                                    (

                                        <div key={index} className='message__modal receiver'>
                                            {item.type === 'audio' ? (
                                                <>
                                                    <audio src={item.content} controls />
                                                    <span className='message-data-span-receiver__modal'>
                                                        {UnixToUTCHour(item.timestamp)}
                                                    </span>
                                                </>
                                            ) :
                                                (
                                                    <>
                                                        {item.image !== '' && item.image !== undefined && (
                                                            <>
                                                                {item.type === 'video' ?
                                                                    (
                                                                        <video style={{width: '100%'}} controls>
                                                                            <source src={item.image} type='video/mp4' />
                                                                        </video>
                                                                    )
                                                                    :
                                                                    (
                                                                        <img style={{ width: '100%' }} src={item.image} alt='imagem de mensagem' />
                                                                    )
                                                                }
                                                            </>
                                                        )}

                                                        <div className='message-content__modal__receiver'>
                                                            {item.content}
                                                        </div>
                                                        <span className='message-data-span-receiver__modal'>
                                                            {UnixToUTCHour(item.timestamp)}
                                                        </span>
                                                    </>
                                                )
                                            }

                                        </div>)
                            )}

                    </div>

                    <div className='footer__modal'>
                        <ReactMediaRecorder
                            whenStopped={async (blobUrl) => {
                                if (this.state.sendAudio) {
                                    const data = new FormData();
                                    data.append('audio', blobUrl)
                                    data.append("content", JSON.stringify({
                                        content: '',
                                        type: 'audio',
                                        owner: parseJwt(),
                                        receiver: this.props.user
                                    }))

                                    if (this.props.selectedChat.id === undefined) {
                                        await api.post('/chat/audio', data);
                                        this.setState({
                                            messageInput: '',
                                            file: '',
                                            filePreview: ''
                                        },
                                            () => this.scrollToMyRef()
                                        );
                                    } else {
                                        await api.post(`/message/${this.props.selectedChat.id}/audio`, data);
                                        this.setState({
                                            messageInput: '',
                                            file: '',
                                            filePreview: ''
                                        },
                                            () => this.scrollToMyRef()
                                        );
                                    }
                                }
                            }}
                            audio
                            render={({ status, startRecording, stopRecording, mediaBlob, mediaUrl }) => (
                                <div className={this.state.audio ? 'col-12 p-0 justify' : 'col-2 p-0'}>
                                    <button
                                        onClick={() => {
                                            startRecording();
                                            let interval = setInterval(() => {
                                                this.setState({
                                                    minutes: this.state.seconds === 60 ? this.state.minutes + 1 : this.state.minutes,
                                                    seconds: this.state.seconds === 60 ? 0 : this.state.seconds + 1
                                                })
                                            }, 1000)

                                            this.setState({
                                                audio: !this.state.audio,
                                                interval
                                            });
                                        }}
                                        type='button'
                                        className='col-12 btn btn-secondary p-0 pt-2 pb-2'
                                        style={{ borderRadius: '50px', display: this.state.audio ? 'none' : 'block' }}
                                    >
                                        <FaMicrophone />
                                    </button>

                                    <div style={{ display: this.state.audio ? 'flex' : 'none' }} className='col-12 justify-content-between aling-items-center'>
                                        <div className='col-2 d-flex p-0'>
                                            <button
                                                onClick={
                                                    async () => {
                                                        this.setState({
                                                            audio: !this.state.audio,
                                                            sendAudio: true
                                                        }, () => stopRecording());
                                                    }
                                                }
                                                type='button'
                                                style={{ borderRadius: '20px' }}
                                                className='btn btn-success btn-block'
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-center col-8' style={{ fontSize: '14pt' }}>
                                            <div
                                                className='p-2'
                                                style={{
                                                    borderRadius: '20px',
                                                    backgroundColor: 'red',
                                                    marginRight: '2%'
                                                }}
                                            ></div>
                                            {("0" + this.state.minutes).slice(-2)}
                                                :
                                                {("0" + this.state.seconds).slice(-2)}
                                        </div>
                                        <div className='col-2 d-flex p-0'>
                                            <button
                                                onClick={
                                                    () => {
                                                        this.setState({
                                                            audio: !this.state.audio,
                                                            sendAudio: false,
                                                            seconds: 0,
                                                            minutes: 0
                                                        }, () => stopRecording());

                                                        clearInterval(this.state.interval)
                                                    }
                                                }
                                                type='button'
                                                style={{ borderRadius: '20px' }}
                                                className='btn btn-danger btn-block'>
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                        <div className='col-10' style={{ display: this.state.audio ? 'none' : 'block' }}>
                            <input style={{ display: 'none' }} type='file' name='chatFile' id='chatFile' onChange={e => {
                                if (e.target.files[0] !== undefined) {
                                    this.setState({ file: e.target.files[0], fileType: e.target.files[0].type })


                                    const fileReader = new FileReader()

                                    fileReader.onloadend = () => {
                                        this.setState({
                                            filePreview: fileReader.result
                                        })
                                    }

                                    fileReader.readAsDataURL(e.target.files[0])
                                }
                            }} />
                            <MDBInputGroup
                                containerClassName="col-12"
                                hint='Envie uma mensagem...'
                                value={this.state.messageInput}
                                onChange={(e) => this.setState({ messageInput: e.target.value })}
                                append={
                                    <button
                                        className='btn btn-success m-0 p-0 pl-3 pr-3'
                                        type='submit'
                                        disabled={this.state.messageInput !== '' || this.state.file !== '' ? false : true}
                                        style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}
                                    >
                                        <FaShare />
                                    </button>
                                }
                            />
                        </div>
                    </div>
                </form>
            </MDBModal>
        )
    }
}