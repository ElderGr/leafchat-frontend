import Image from 'next/image'
import { Form, Button, Card, Row, Col, notification } from 'antd'
import { useAuth } from '../domain/authenticate/auth.hook'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LockOutlined, UserOutlined } from '@ant-design/icons'; 
import { Input } from '@/app/components'

type FormValues = {
  email: string;
  password: string;
}

export default function SignUp() {
  const auth = useAuth()
  const router = useRouter()

  const handleSubmit = (values: FormValues) => {
    auth
    .mutateAsync({
      email: values.email,
      password: values.password
    })
    .then(() => router.push('/feed'))
    router.push('/feed')
  }

  return (
    <Row style={{ height: '100vh' }} >
      <Col span={6} offset={9}>
        <Col span={6} offset={9}>
          <Image  
            width={100} 
            height={100} 
            src="/logo.svg"
            alt='Logo' 
          />
          <h1>Leafchat</h1>
        </Col>
        
        <Card>
          <Form
            onFinish={handleSubmit}
            onFinishFailed={() => console.log('falha')}   
            className=""
          >
            <Input 
              formItemProps={{
                rules: [{ required: true, message: 'Por favor, insira seu email' }],
                label: 'Email',
                name: 'email'
              }}
              inputProps={{
                placeholder: "Email",
                required: true,
                prefix: <UserOutlined className="site-form-item-icon" />
              }}
            />
            <Input 
              formItemProps={{
                label: 'Senha',
                name: 'password'
              }}
              inputProps={{
                id: "password" ,
                type: "password" ,
                placeholder: "******************",
                prefix: <LockOutlined className="site-form-item-icon" />
              }}
            />
            
            <Row>
              <Col span={8}>
                <Button style={{width: '100%'}} size='large' type="primary" htmlType="submit" >
                  Entrar
                </Button>
              </Col>
              <Col style={{ display: 'flex', alignItems: 'center' }} span={8} offset={8}>
                <Link href="forget-password" >
                  Esqueceu a senha?
                </Link>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
