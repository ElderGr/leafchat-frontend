import { Avatar, Badge, Card, Col, Row, Space, Tooltip } from "antd";
import { UserOutlined, MoreOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLikeOnPost, useListPost } from "@/app/domain/post/post.hook";
import { usePostContext } from "@/app/context/post";
import { useState } from "react";

export function Feed() {
  const [take, setTake] = useState(5)
  const [hasMore, setHasMore] = useState(true);
  const { data, refetch } = useListPost({ take: take })
  const addLike = useLikeOnPost()
  const { openCommentsOnForm } = usePostContext()

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <div
        id="scrollableDiv"
        style={{
          height: 600,
          overflow: 'auto',
          display: 'flex',
        }}
      >
        <InfiniteScroll
          dataLength={take}
          next={() => {
            if (hasMore) {
              setTake(prevState => prevState + 3);
              refetch().then(({data}) => {
                data?.length !== take && setHasMore(false);
              })
            }
          }}
          scrollableTarget="scrollableDiv"
          hasMore={hasMore}
          loader={<h4>Carregando...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {data && data.map((post) => (
            <Card
              actions={[
                <div
                  onClick={() => { addLike.mutateAsync(post.id) }}
                  key="like"
                >
                  <Tooltip placement="top" title='Curtir' >
                    <Badge count={post._count.Likes}>
                      <LikeOutlined />
                    </Badge>
                  </Tooltip>
                </div>
                ,
                <div onClick={() => openCommentsOnForm(post)} key="comments" >
                  <Tooltip
                    placement="top"
                    title='Comentários'
                  >
                    <Badge count={post._count.Comments}>
                      <CommentOutlined key="edit" />
                    </Badge>
                  </Tooltip>
                </div>
                ,
                <Tooltip key="options" placement="top" title='Opções'>
                  <MoreOutlined />
                </Tooltip>
              ]}
              key={post.id}
            >
              <Row>
                <Col span={1}>
                  <Avatar icon={<UserOutlined />} />
                </Col>
                <Col span={20}>
                  <h2>{post.title}</h2>
                </Col>
              </Row>
              <Row>
                <Col offset={1} span={20}>
                  <p>{post.description}</p>
                </Col>
              </Row>
            </Card>
          ))}
        </InfiniteScroll>
      </div>
    </Space>
  )
}