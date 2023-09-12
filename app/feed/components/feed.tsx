import { Avatar, Badge, Card, Col, Row, Space, Tooltip } from "antd";
import { UserOutlined, MoreOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';
import { useListPost } from "@/app/domain/post/post.hook";
import { usePostContext } from "@/app/context/post";

export function Feed(){
    const { data } = useListPost()
    const { openCommentsOnForm } = usePostContext()
    
    return (
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        {data && data.map(post => (
          <Card 
            actions={[
              <Tooltip key="like" placement="top" title='Curtir' >
                <Badge  count={5}>
                  <LikeOutlined  />
                </Badge>
              </Tooltip>,
              <div onClick={() => openCommentsOnForm(post)} key="comments" >
                <Tooltip
                    placement="top" 
                    title='Comentários' 
                >
                    <Badge count={5}>
                        <CommentOutlined  key="edit" />
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
      </Space>
    )
}