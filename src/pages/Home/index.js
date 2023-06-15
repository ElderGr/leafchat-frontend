import React, { useEffect, useState } from 'react';

import './styles.css';

import {
    FaHome,
    FaUser,
    FaSignOutAlt,
    FaChevronDown,
    FaAddressBook,
    FaCommentAlt
} from "react-icons/fa";

import { BrowserRouter as Router, Link, Route, Switch, useHistory } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";

import ChatContainer from "../../components/chatContainer";

import Feed from "../Feed";
import Users from "../Users";
import api from '../../services/api';
import { parseJwt } from '../../services/auth';


export default function Home(props) {

    const [selectedItem, setSelectedItem] = useState('Home');
    const [selectedMenu, setSelectedMenu] = useState('Contatos');
    const [users, setUsers] = useState([]);
    const [modalChat, setModalChat] = useState(false);
    const [selectedUser, setselectedUser] = useState({});
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState({});

    const history = useHistory();

    const currentUser = parseJwt();

    useEffect(() => {
        async function initalize() {
            // history.push(`${props.match.path}/feed`);

            const userResult = await api.get('users');
            setUsers(userResult.data);

            const chatResult = await api.get('chat', {
                headers: {
                    user: currentUser.id
                }
            });
            setChats(chatResult.data);
        }
        initalize()
    }, [])

    const addMessage = (message) => {
        console.log(selectedChat)

        let arr = selectedChat.messages;
        arr.push(message);

        setSelectedChat({
            ...selectedChat,
            messages: arr
        });
    }

    return (
        <div className='home-container'>
            <aside className='nav-menu'>
                <div className="fixed-top home-users">
                    <Link
                        to={`${props.match.path}/feed`}
                        className={`nav-item ${selectedItem === 'home' && 'active'}`}
                        onClick={() => setSelectedItem('Home')}
                    >
                        <div>
                            <FaHome />
                        </div>
                        <span>
                            Home
                        </span>
                    </Link>
                    {
                        currentUser.access === 'administrador' && (
                            <Link
                                to={`${props.match.path}/users`}
                                className={`nav-item ${selectedItem === 'Usuários' && 'active'}`}
                                onClick={() => setSelectedItem('Usuários')}
                            >
                                <div>
                                    <FaUser />
                                </div>
                                <span>
                                    Usuários
                                </span>
                            </Link>
                        )
                    }

                </div>
                <div className="fixed-bottom logout">
                    <Link to='/' className='nav-item'>
                        <div>
                            <FaSignOutAlt />
                        </div>
                        <span>
                            Logout
                        </span>
                    </Link>
                </div>
            </aside>

            <main className='main-container'>
                <header className='border p-3'>
                    <b style={{ fontSize: '14pt', color: 'white' }}>{selectedItem}</b>
                </header>
                
                <Switch>
                    <Route path={`${props.match.path}/feed`} component={Feed} />
                    <Route path={`${props.match.path}/users`} component={Users} />
                </Switch>
            </main>

            <div className='chat-container'>
                <header>
                    <img src={logo} className="rounded mx-auto logo d-block" />

                    <input placeholder='Procurar...' />
                </header>
                <section className='border d-flex'>
                    <div onClick={() => setSelectedMenu('Contatos')} style={{ height: '2.5rem', cursor: 'pointer' }} className={`${selectedMenu === 'Contatos' && 'active'} border-right col-6 d-flex justify-content-center align-items-center`}>
                        <FaAddressBook style={{ width: '20%', height: '60%', color: 'white' }} />
                    </div>
                    <div onClick={() => setSelectedMenu('Conversas')} style={{ height: '2.5rem', cursor: 'pointer' }} className={`${selectedMenu === 'Conversas' && 'active'} col-6 d-flex justify-content-center align-items-center`}>
                        <FaCommentAlt style={{ width: '20%', height: '60%', color: 'white' }} />
                    </div>
                </section>

                {selectedMenu === 'Contatos' &&
                    <div style={{ minHeight: '204px', overflowY: 'scroll', height: 'calc(100% - 233.9px)' }}>
                        {users.map((item, index) => item.name !== currentUser.name && (
                            <div
                                key={index}
                                onClick={() => {
                                    setModalChat(!modalChat);
                                    setselectedUser(item);
                                    setSelectedChat({})

                                    chats.forEach(chat => {
                                        if (chat.participants.indexOf(item.id) !== -1 && chat.participants.indexOf(currentUser.id) !== -1) {
                                            setSelectedChat(chat)
                                        }
                                    })

                                }}
                                className='conversation-container'
                            >
                                <div></div>
                                <div>
                                    <div style={{ color: 'white' }}><b>{item.name}</b></div>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {selectedMenu === 'Conversas' && (
                    <div style={{ overflowY: 'scroll' }}>
                        {chats.map((item, index) => (
                            <div key={index} onClick={() => {
                                setModalChat(!modalChat);
                                setSelectedChat(item);
                                //busca qual é o usuário que você está conversando
                                item.participants.forEach(async parts => {
                                    if (parts !== currentUser.id) {
                                        const result = await api.get(`/users/${parts}`);
                                        setselectedUser(result.data)
                                    }
                                })

                            }} className='conversation-container'>
                                <div></div>
                                <div>
                                    <div style={{ color: 'white' }}><b>{item.id}</b></div>
                                    <span>{item.messages[item.messages.length - 1].content}</span>
                                </div>
                                <div>
                                    <FaChevronDown />
                                </div>
                            </div>
                        ))}
                    </div>

                )}

                <ChatContainer
                    modalChat={modalChat}
                    closeModal={() => setModalChat(!modalChat)}
                    user={selectedUser}
                    selectedChat={selectedChat}
                    reloadChat={(chat) => {
                        setSelectedChat(chat);

                        let arr = chats;
                        arr.push(chat)
                        setChats(arr);
                    }}
                    addMessage={(msg) => addMessage(msg)}
                />
            </div>
        </div>
    );
}
