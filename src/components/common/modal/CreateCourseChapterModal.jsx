import { Button, Form, Input, Modal } from 'antd';
import { useParams } from 'react-router';
import useAxios from '../../../hooks/useAxios';

const CreateCourseChapterModal = ({ isModalOpen, setIsModalOpen, editMode, selectedChapterName, selectedChapterId, data, setData }) => {
  const [form] = Form.useForm();
  const { api } = useAxios();
  const { id } = useParams();
  
  const handleUpdateChapter = async (values) => {
    const newData = data.map(d => {
      if(d.id === selectedChapterId) {
        d.name = values.name 
      }
      return d;
    })

    try {
      const { data } = await api.post('/admin/chapter/update', {
        id,
        chapter: JSON.stringify(newData)
      })
      if(data.message === 'Successfully update a cource') setData(newData);
      window.showLoading(false);
      window.openNoti('Message', `Update chapter name successfully.`);
      setIsModalOpen(false);
    } catch (error) {
      window.showLoading(false);
      setIsModalOpen(false);
      window.openNoti('Message', `Failed to update chapter name.`);
    }
  }

  const onFinish = async (values) => {
    if(editMode) {
      handleUpdateChapter(values);
      return;
    }

    window.showLoading(true);
    const chapter_id = data === null ? 1 : Math.max(...data.map(d => d.id)) + 1;
    const newData = data === null ? [{ id: chapter_id, name: values.name }] : [{ id: chapter_id, name: values.name }, ...data]; 
    try {
      const { data } = await api.post('/admin/chapter/create', {
        id,
        chapter: JSON.stringify(newData)
      })
      if(data.message === 'Successfully added a new chapter') setData(newData);
      window.showLoading(false);
      window.openNoti('Message', `Create new chapter successfully.`);
      setIsModalOpen(false);
    } catch (error) {
      window.showLoading(false);
      setIsModalOpen(false);
      window.openNoti('Message', `Failed to create new chapter.`);
    }
  };

  return (
    <Modal
      title={`${editMode ? 'Update' : 'Create'} course chapter`}
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
          {editMode ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCourseChapterModal;