'use client'
import { Card, Col, Row } from "antd";
import Private from "../components/Layout/Private";
import { useListPost } from "../domain/post/post.hook";

export default function Feed() {
  const { data } = useListPost()

  return (
    <Private>
      <Row>
        <Col span={17}>
          {data && data.map(post => (
            <Card key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </Card>
          ))}
          
        </Col>
        <Col offset={1} span={6}>
          <Card>
            Aside
          </Card>
        </Col>
      </Row>
    </Private>
  )
}