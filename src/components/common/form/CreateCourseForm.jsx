// import { useState } from 'react';
import { Button, Form, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import ReactQuill from "react-quill";
import { modules } from "../../../constants/RichTextEditorModules";
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.scss";

const CreateCourseForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values, "values");
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
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Course type"
        name="type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          // defaultValue="lucy"
          // onChange={handleChange}
          options={[
            {
              value: 0,
              label: "Online",
            },
            {
              value: 1,
              label: "Offline",
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Course instructor"
        name="type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          // defaultValue="lucy"
          // onChange={handleChange}
          options={[
            {
              value: 0,
              label: "Alan",
            },
            {
              value: 1,
              label: "Henry",
            },
          ]}
        />
      </Form.Item>
      
      <Form.Item
        label="Course Image"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Upload
          name="file"
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture"
          onChange={(info) => console.log(info.file, "info")}
          style={{ borderColor: "" }}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Course introduction"
        name="introduction"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Course description"
        name="description"
        rules={[{ required: true }]}
      >
        <ReactQuill theme="snow" modules={modules} />
      </Form.Item>

      <Form.Item label="Resources & Attachments" name="resource">
        <Upload
          name="file"
          // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          // listType="picture"
          beforeUpload={() => false}
          onChange={(info) => console.log(info.file, "info")}
          style={{ borderColor: "" }}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button htmlType="submit" type="primary">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateCourseForm;
