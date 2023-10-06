import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.styles.css'
import { socket } from '@/app/config/socket/socket.io';
import { MessagesModel } from '@/app/domain/messages/messages.types';
import { useChatContext } from '@/app/context/chat';
import { useAuthContext } from '@/app/context/auth';
import { useListUsers } from '@/app/domain/user/user.hook';
import { format } from 'date-fns';

const count = 3;

export function ChatMessagesList(){
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MessagesModel[]>([]);
  const [list, setList] = useState<MessagesModel[]>([]);

  const { selectedChat } = useChatContext()
  const { user } = useAuthContext()
  const chatUsers = useListUsers({
    id: selectedChat?.participants || []
  })

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
                        avatar={
                          <Avatar 
                            src={chatUsers.data?.find(currUser => 
                              currUser.id === item.senderId)?.avatar_url
                            }
                            icon={<UserOutlined />} 
                          />
                        }
                        title={item.content}
                        description={item.created_at && format(new Date(item.created_at), 'HH:mm')}
                        className={`chat-message ${user?.id === item.senderId ? 'own-message' : ''}`}
                    />
                    </Skeleton>
                </List.Item>
              )
            }
        />
    )
}