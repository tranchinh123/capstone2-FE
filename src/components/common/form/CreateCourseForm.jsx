import { useState } from 'react';
import { Button, Form, Input, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import ReactQuill from 'react-quill';
import useAxios from '../../../hooks/useAxios';
import { modules } from '../../../constants/RichTextEditorModules';
import 'react-quill/dist/quill.snow.css';
import styles from './styles.module.scss';

const CreateCourseForm = ({ propCourse }) => {
  const [name, setName] = useState(propCourse?.cource_name);
  const [type, setType] = useState(propCourse?.cource_type);
  const [image, setImage] = useState(propCourse?.cource_image ? [{ url: propCourse?.cource_image }] : null);
  const [introduction, setIntroduction] = useState(propCourse?.cource_introduce);
  const [description, setDescription] = useState(propCourse?.cource_description);

  const [form] = Form.useForm();
  const { api } = useAxios();
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      const courseImage = image[0].url || image[0].originFileObj
      const formData = new FormData();
      formData.append('cource_name', name);
      formData.append('cource_image', courseImage);
      formData.append('cource_type', type);
      formData.append('cource_introduce', introduction);
      formData.append('cource_description', description);
      formData.append('id', propCourse?.id);
      await api.post(
        `/admin/cource/${propCourse ? 'update' : 'create'}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      navigate('/courses');
      window.openNoti('Message', `${propCourse ? 'Update' : 'Create'} new course succesfully.`)
    } catch (error) {
      window.openNoti('Message', `Failed to ${propCourse ? 'update' : 'create'} new course.`)
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      className={styles.createCourseForm}
    >
      <Form.Item
        label="Course name"
        name="name"
        rules={[
          {
            required: true
          }
        ]}
        initialValue={propCourse?.cource_name}
      >
        <Input value={name} onChange={e => setName(e.target.value)}/>
      </Form.Item>
      <Form.Item
        label="Course type"
        name="type"
        rules={[
          {
            required: true
          }
        ]}
        initialValue={propCourse?.cource_type}
      >
        <Select
          // defaultValue="lucy"
          onChange={value => setType(value)}
          options={[
            {
              value: 0,
              label: 'Online'
            },
            {
              value: 1,
              label: 'Offline'
            }
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Course Image"
        name="title"
        // rules={[
        //   {
        //     required: true
        //   }
        // ]}
      >
        <Upload
          name="file"
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture"
          onChange={(info) => setImage(info.fileList)}
          style={{ borderColor: '' }}
          beforeUpload={() => {
            return false;
          }}
          fileList={image}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Course introduction"
        name="introduction"
        rules={[{ required: true }]}
        initialValue={propCourse?.cource_introduce}
      >
        <Input value={introduction} onChange={(e) => setIntroduction(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Course description"
        name="description"
        rules={[{ required: true }]}
        initialValue={propCourse?.cource_description}
      >
        <ReactQuill theme="snow" modules={modules} value={description} onChange={(value) => setDescription(value)} />
      </Form.Item>

      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button htmlType="submit" type="primary">
          {propCourse ? 'Update' : 'Create'} 
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateCourseForm;