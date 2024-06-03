import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Form, Input, Button, Card, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import InputMask from 'react-input-mask';
import {login} from "../services/Authenticator.js";

const { Title } = Typography;

const Login = () => {

  const onFinish = async (values) => {
    const cleanedUsername = values.username.replace(/[.-]/g, '');
    try {
      console.log(values)
      await login(cleanedUsername, values.password);
    } catch (error) {}
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Card
        style={{
          width: '400px',
          margin: 'auto',
          marginTop: '10%',
          textAlign: 'center',
        }}
      >
        <Title level={3}>Login</Title>
        <Divider />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Por favor, insira seu CPF!' }]}
          >
            <InputMask mask="999.999.999-99" maskChar="">
              {() => <Input prefix={<UserOutlined />} placeholder="CPF" />}
            </InputMask>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Senha" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: '100%', backgroundColor: '#45070D' }}
            >
              Entrar
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Link to="/recuperar/senha">Esqueci minha senha</Link>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default Login;
