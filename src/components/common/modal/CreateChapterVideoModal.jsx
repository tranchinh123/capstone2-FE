import { Button, Form, Input, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CreateChapterVideoModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values, 'values');
  };

  return (
    <Modal
      title="Create chapter video"
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
          label="Name of video"
          name="name"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Video file" name="resource" required>
          <Upload
            name="file"
            beforeUpload={() => false}
            onChange={(info) => console.log(info.file, 'info')}
            style={{ borderColor: '' }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
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

export default CreateChapterVideoModal;