import { useState } from "react";
import { Button, Form, Input } from 'antd';
import useAxios from "../../hooks/useAxios";
import { setCookie } from "../../configs/cookie";
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [form] = Form.useForm();
  const { api, setAccessToken } = useAxios();
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      const { data } = await api.post('/login', {
        email,
        password
      });
      setCookie('access_token', data.token);
      setAccessToken(data.token);
      // navigate('/');
    } catch (error) {
      // if (error.response.data.error === 'Email or password is not correct') {
      // }
      // if (error.response.data.error === 'Your account has been locked') {
      // }
    }
  };


  return (
    <div className={styles.loginPage}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className={styles.loginForm}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <h2>Welcome to ...</h2>
        </div>
        <Form.Item
          label="Email"
          name="email"
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
        >
          <Input value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
            Login
          </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default LoginPage