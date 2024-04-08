import { Button, Form, Input, Modal } from 'antd';

const CreateCourseChapterModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values, 'values');
  };

  return (
    <Modal
      title="Create course chapter"
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
          label="Name of chapter"
          name="name"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCourseChapterModal;