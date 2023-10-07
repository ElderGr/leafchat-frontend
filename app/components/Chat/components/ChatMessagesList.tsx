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
import { useListMessages } from '@/app/domain/messages/messages.hook';

export function ChatMessagesList(){
  const [initLoading, setInitLoading] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<MessagesModel[]>([]);

  const { selectedChat } = useChatContext()
  const { user } = useAuthContext()

  const [searchParams, setSearchParams] = useState({
    chatId: selectedChat?.id || '',
    page: 1,
    pageSize: 10
  })

  const chatUsers = useListUsers({
    id: selectedChat?.participants || []
  })

  const { data, isLoading } = useListMessages(searchParams)

  useEffect(() => {
    handleData()
  }, [data])

  
  socket.on('message_list', (data: MessagesModel) => {
    console.log(data, 'socket')
    // setData(data)
    setList([
      data,
      ...list
    ])
  })

  const handleData = () => {
    if(data){
      setList([
        ...list,
        ...data.data
      ])
    }
  }

  const onLoadMore = () => {
    setSearchParams({
      ...searchParams,
      page: searchParams.page + 1
    })

    // setList(
    //   data.concat([...new Array(count)].map(() => ({ 
    //     content: '', 
    //     contentType: '', 
    //     '_id': '',
    //     chatId: '',
    //     senderId: ''
    //   }))),
    // );
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
            loading={isLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            id='chat'
            renderItem={(item) => 
              item.contentType === 'audio' ? (
                <div>
                  <audio controls src={item.content} />
                  <div>{item.created_at && format(new Date(item.created_at), 'HH:mm')}</div>
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