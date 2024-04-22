import { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Upload, Select, TimePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useAxios from '../../../hooks/useAxios';
import { useParams } from 'react-router';

const CreateChapterLessonModal = ({ isModalOpen, setIsModalOpen, editMode, selectedLessonId, selectedChapterId, getLessons }) => {
  const [loading, setLoading] = useState(editMode);
  const [form] = Form.useForm();
  const { api } = useAxios();
  const { id } = useParams();

  const handleGetLessonDetail = async () => {
    try {
      const { data } = await api.get(`/admin/lesson/get-data/${selectedLessonId}`);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  const createNewLesson = async (name, video, time, id_excercise) => {
    window.showLoading(true);
    try {
      const formData = new FormData();
      formData.append('lesson_name', name);
      formData.append('lesson_video', video);
      formData.append('time', time);
      formData.append('id_excercise', '');
      formData.append('id_chapter', selectedChapterId);
      formData.append('id_cource', id);
      await api.post(
        '/admin/lesson/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      window.showLoading(false);
      setIsModalOpen(false);
      window.openNoti('Message', 'Create new lesson successfully.');
      getLessons();
    } catch (error) {
      window.showLoading(false);
      window.openNoti('Message', 'Failed to create new lesson.');
    }
  }

  const onFinish = (values) => {
    createNewLesson(values.name, values.resource.file, String(values.video_length.$d).split(' ')[4]);
  };

  useEffect(() => {
    if(editMode) {
      handleGetLessonDetail();
    }
  }, []);
  

  return (
    <Modal
      title={`${editMode ? 'Update' : 'Create'} chapter lesson`}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={() => <></>}
    >
      {loading ? <></> : (
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
              // onChange={(info) => console.log(info.file, 'info')}
              style={{ borderColor: '' }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Video length" name="video_length" required>
            <TimePicker showNow={false} />
          </Form.Item>
          <Form.Item label="Excercise" name="resource">
            <Select
              showSearch
              placeholder="Search to Select"
              // optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLocaleLowerCase()
                  .includes(input.toLocaleLowerCase())
              }
              // defaultValue={'1'}
              options={[
                {
                  value: '1',
                  label: 'Not Identified'
                },
                {
                  value: '2',
                  label: 'Closed'
                }
              ]}
            />
          </Form.Item>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button htmlType="submit" type="primary">
              {editMode ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default CreateChapterLessonModal;