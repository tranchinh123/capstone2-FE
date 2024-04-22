import {  useState } from 'react';
import { Button, Modal, Form, Input  } from 'antd';
import useAxios from '../../../hooks/useAxios';

const CreateUserModal = ({ isModalOpen, setIsModalOpen, getUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [form] = Form.useForm();
  const { api } = useAxios();

  const createUser = async () => {
    window.showLoading(true);
    try {
       await api.post('/admin/user/create', {
         email,
         full_name: name,
         address,
         phone
       })
       getUsers();
       setIsModalOpen(false);
       window.showLoading(false);
       window.openNoti('Message', 'Create new user succesfully.')
    } catch (error) {
      window.showLoading(false);
      window.openNoti('Message', 'Failed to create new user.')
    }
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
 }

  const onFinish = async () => {
    createUser();
  };

  return (
    <Modal
      title="Create user"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={() => <></>}
      style={{ margin: '0 auto' }}
      width="640px"
    >
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Full name"
              name="name"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input  value={name} onChange={e => setName(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true
                },
                {
                  pattern:
                    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                  message: 'Email is incorrect format!'
                }
              ]}
            >
              <Input  value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input value={phone} onChange={e => setPhone(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input value={address} onChange={e => setAddress(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
                Create
              </Button>
          </Form.Item>
          </Form>
    </Modal>
  );
};

export default CreateUserModal;