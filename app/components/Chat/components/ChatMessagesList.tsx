import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.styles.css'
import { socket } from '@/app/config/socket/socket.io';
import { MessagesModel } from '@/app/domain/messages/messages.types';

interface DataType {
    gender?: string;
    name: {
      title?: string;
      first?: string;
      last?: string;
    };
    email?: string;
    picture: {
      large?: string;
      medium?: string;
      thumbnail?: string;
    };
    nat?: string;
    loading: boolean;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

type Props = {
  chat: string | null;
}

export function ChatMessagesList({
  chat
}: Props){
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MessagesModel[]>([]);
  const [list, setList] = useState<MessagesModel[]>([]);

  useEffect(() => {
    socket.emit('message_list', chat)
  }, [chat])

  
  socket.on('message_list', (data: MessagesModel[]) => {
    setInitLoading(false);
    setData(data)
    setList(data)
  })

  // useEffect(() => {
  //   fetch(fakeDataUrl)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setInitLoading(false);
  //       setData(res.results);
  //       setList(res.results);
  //     });
  // }, []);

  const onLoadMore = () => {
    setLoading(true);
    // data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))),
    setList(
      data.concat([...new Array(count)].map(() => ({ 
        content: '', 
        contentType: '', 
        '_id': '',
        chatId: '',
        senderId: ''
      }))),
    );

    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     const newData = data.concat(res.results);
    //     setData(newData);
    //     setList(newData);
    //     setLoading(false);
        
    //     window.dispatchEvent(new Event('resize'));
    //   });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>Ver conversas anteriores</Button>
      </div>
    ) : null;

    return(
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={list}
            id='chat'
            renderItem={(item) => (
            <List.Item>
                <Skeleton 
                  avatar 
                  title={false} 
                  loading={false} 
                  active
                >
                <List.Item.Meta
                    avatar={<Avatar style={{background: 'gray'}} src={<UserOutlined />} />}
                    description={item.content}
                />
                </Skeleton>
            </List.Item>
            )}
        />
    )
}