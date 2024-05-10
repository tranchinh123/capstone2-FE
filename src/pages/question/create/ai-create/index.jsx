import { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Drawer } from 'antd';

const AICreate = ({ open, setOpen }) => {
  const [form] = Form.useForm();

  const onFinish = async () => {

  };

  return (
      <Drawer title="Create question with AI" onClose={() => setOpen(false)} open={open}>
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Type of question"
              name="type"
              required
            >
              <Select
                // onChange={handleChange}
                options={[
                  {
                    value: 'multiple choice',
                    label: 'Multiple Choice questions',
                  },
                  {
                    value: 'essay question',
                    label: 'Essay questions',
                  },
                ]}
            />
            </Form.Item>
            <Form.Item
              label="Topic"
              name="topic"
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Level of difficulty"
              name="difficulty"
              required
            >
              <Select
                // onChange={handleChange}
                options={[
                  {
                    value: 'easy',
                    label: 'Easy',
                  },
                  {
                    value: 'medium',
                    label: 'Medium',
                  },
                  {
                    value: 'hard',
                    label: 'Hard',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Number of options"
              name="topic"
              required
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
                Create
              </Button>
            </Form.Item>
        </Form>
      </Drawer>
  );
};
export default AICreate;