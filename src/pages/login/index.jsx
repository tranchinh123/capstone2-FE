import { useState } from "react";
import { Button, Form, Input } from "antd";
import useAxios from "../../hooks/useAxios";
import { setCookie } from "../../configs/cookie";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../contexts/MainContext";
import styles from "./styles.module.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const { api, setAccessToken } = useAxios();
  const { user } = useAppContext();

  const onFinish = async () => {
    try {
      const { data } = await api.post("/login", {
        email,
        password,
      });
      setCookie("access_token", data.token);
      setAccessToken(data.token);
      window.location.reload();
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      {!user ? (
        <div className={styles.loginPage}>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            className={styles.loginForm}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <h2>Welcome</h2>
            </div>
            <Form.Item label="Email" name="email">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default LoginPage;
