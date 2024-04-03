import { Button, Form, Input, Modal } from 'antd';

const LoginModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values, 'values');
  };

  return (
    <>
      <Modal
        title="Log in to your LMS account"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={() => <></>}
      >
        <Form
          layout="vertical"
          form={form}
          style={{
            maxWidth: 600
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="input placeholder" />
          </Form.Item>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginModal;
