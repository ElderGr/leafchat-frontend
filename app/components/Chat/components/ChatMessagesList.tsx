import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.styles.css'
import { socket } from '@/app/config/socket/socket.io';
import { MessagesModel } from '@/app/domain/messages/messages.types';
import { useChatContext } from '@/app/context/chat';
import { useAuthContext } from '@/app/context/auth';

const count = 3;

export function ChatMessagesList(){
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MessagesModel[]>([]);
  const [list, setList] = useState<MessagesModel[]>([]);

  const { selectedChat } = useChatContext()
  const { user } = useAuthContext()

  useEffect(() => {
    if(selectedChat?.id){
      socket.emit('message_list', selectedChat?.id)
    }
  }, [selectedChat?.id])

  
  socket.on('message_list', (data: MessagesModel[]) => {
    setData(data)
    setList(data)
  })

  const onLoadMore = () => {
    setLoading(true);

    setList(
      data.concat([...new Array(count)].map(() => ({ 
        content: '', 
        contentType: '', 
        '_id': '',
        chatId: '',
        senderId: ''
      }))),
    );
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
            renderItem={(item) => 
              item.contentType === 'audio' ? (
                <div>
                  <audio controls src={item.content} />
                </div>
              ) :
              (
                <List.Item>
                    <Skeleton 
                      avatar 
                      title={false} 
                      loading={false} 
                      active
                    >
                    <List.Item.Meta
                        avatar={<Avatar style={{background: 'gray'}} icon={<UserOutlined />} />}
                        title={item.content}
                        description={'data da mensagem'}
                        className={`chat-message ${user?.id === item.senderId ? 'own-message' : ''}`}
                    />
                    </Skeleton>
                </List.Item>
              )
            }
        />
    )
}