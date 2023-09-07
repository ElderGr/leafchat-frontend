'use client'
import React, { useState } from 'react';
import { Button, Image, Layout, Menu } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
const { Header, Sider, Content,  } = Layout;

type PrivateProps = {
  children: React.ReactNode
}

function Private ({
  children
}: PrivateProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter()
  const path = usePathname()
  
  const handleRoute = (props: any) => {
    router.push(props)
  }

  const handleMenuKeySelection = () => {
    return path === '/feed' ? ['1'] : ['2']
  }

  return (
     <Layout style={{
      height: '100vh'
     }}>
       <Sider trigger={null} collapsible collapsed={collapsed}>
         <Image 
            src='/logo.svg'
            width={40}
            height={40}
            alt='Logo'
         />
         <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={handleMenuKeySelection()}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Feed',
              onClick: () => handleRoute('/feed')
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Users',
              onClick: () => handleRoute('/user')
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: 'white',
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Private;
