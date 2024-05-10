import { Button, Form, Input, Modal } from "antd";

const EditClassModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {};

  return (
    <Modal
      title="123"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={() => <></>}
    >
      <Form
        layout="vertical"
        form={form}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name of chapter"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditClassModal;
