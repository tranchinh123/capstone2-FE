import { Button, Form, Input, Modal } from 'antd';
import useAxios from "../../../hooks/useAxios";

const EditClassModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedLesson,
  handleGetCourseInfo,
  setSelectedLesson,
}) => {
  const [form] = Form.useForm();
  const { api } = useAxios();

  const onFinish = async (values) => {
    window.showLoading(true);
    try {
      await api.post("/admin/class-detail/update", {
        id: selectedLesson.id,
        title: values.title,
      });
      window.showLoading(false);
      window.openNoti("Message", "Successfully update lesson");
      handleGetCourseInfo();
      setIsModalOpen(false);
    } catch (error) {
      window.showLoading(false);
      window.openNoti("Message", "Failed to update lesson");
      setIsModalOpen(false);
    }
  };

  return (
    <Modal
      title="Update lesson"
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        setSelectedLesson(null);
      }}
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
          label="Title of lesson"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={selectedLesson.title}
        >
          <Input placeholder="Enter lesson title" />
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
