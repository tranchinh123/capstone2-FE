import { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Modal, Select } from "antd";
import useAxios from '../../../hooks/useAxios';

function hasDuplicates(array) {
  const uniqueElements = new Set(); 
  for (const element of array) {
      if (uniqueElements.has(element)) {
          return true; 
      }
      uniqueElements.add(element); 
  }
  return false; 
}

const CreateExcerciseModal = ({ isModalOpen, setIsModalOpen, listOfQuestions, getExcercises, selectedExcerciseInfo }) => {
  const [excerciseName, setExcerciseName] = useState('');
  const [excerciseType, setExcerciseType] = useState(selectedExcerciseInfo?.excercise_type || 0);
  const [listQuestions, setListQuestions] = useState([]);
  const listOfQuestionsForOffline = listOfQuestions.filter(v => v.type === 0);
  const initialSelectedQuestionsForOff = selectedExcerciseInfo?.excercise_type === 1 ? JSON.parse(selectedExcerciseInfo.excercise_content) : null;
  const initialSelectedQuestionsForOnl = selectedExcerciseInfo?.excercise_type === 0 ? JSON.parse(selectedExcerciseInfo.excercise_content) : null;

  const { api } = useAxios();

  
  // const handleTypeChange = (value) => {
  //   if(value === 1) {}
  // }
  const onFinish = async (values) => {
    if(values.excercise_off) {
      if(hasDuplicates(values.excercise_off.map(v => v.question_id))) {
        window.openNoti('Message', 'There is duplicate questions. Please remove duplicate.');
        return;
      }
    }
    if(values.excercise_onl) {
      if(hasDuplicates(values.excercise_onl.map(v => v.question_id))) {
        window.openNoti('Message', 'There is duplicate questions. Please remove duplicate.');
        return;
      }
    }

    if(values?.excercise_onl?.length === 0 || values?.excercise_off?.length === 0) {
      window.openNoti('Message', 'Please select questions for the excercise.');
      return;
    }

    try {
      window.showLoading(true);
      await api.post(`/admin/excercise/${selectedExcerciseInfo ? 'update' : 'create'}`, {
        "id": selectedExcerciseInfo ? selectedExcerciseInfo.id : null,
        "excercise_name": values.name,
        "excercise_content": JSON.stringify(values?.excercise_off || values.excercise_onl),
        "excercise_type": values.type,
      })
      window.showLoading(false);
      window.openNoti('Message', 'Create new excercise successfully');
      setIsModalOpen(false);
      getExcercises(true);
    } catch (error) {
      window.showLoading(false);
      window.openNoti('Message', 'Failed to create new excercise');
      console.log(error, 'error');
    }
  };

  return (
    <Modal
      title={`${selectedExcerciseInfo ? 'Update' : 'Create' } excercise`}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={() => <></>}
      style={{ margin: "0 auto" }}
      width="640px"
    >
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          maxHeight: 500,
          overflowY: "scroll",
        }}
        autoComplete="off"
        layout='vertical'
      >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the name of excercise' }]} initialValue={selectedExcerciseInfo?.excercise_name || ''}>
        <Input style={{ width: '97%' }} />
      </Form.Item>
      <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select the type of excercise' }]} initialValue={excerciseType}>
        <Select
          style={{ width: '97%' }}
          onChange={(value) => setExcerciseType(value)}
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
    {/* <Form.List name="excercise" initialValue={[{ question: 'jack', mark: '20' }]}> */}
    {excerciseType === 1 && (
      <Form.List name="excercise_off" initialValue={initialSelectedQuestionsForOff}>
        {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'question_id']}
                      rules={[
                        {
                          required: true,
                          message: 'Please select question',
                        }
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: 350 }}
                        options={listOfQuestionsForOffline}
                        placeholder="Question"
                    />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'mark']}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter question mark',
                        },
                        () => ({
                          validator(_, value) {
                            if (isNaN(value) || Number(value) <= 0) {
                              return Promise.reject(new Error('Mark must be an positive number and greater than 0'));
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input placeholder="Mark"  />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item style={{ paddingRight: '20px' }}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add question
                  </Button>
                </Form.Item>
              </>
            )
          }
        }
      </Form.List>
    )}
    {excerciseType === 0 && (
      <Form.List name="excercise_onl" initialValue={initialSelectedQuestionsForOnl}>
        {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'question_id']}
                      rules={[
                        {
                          required: true,
                          message: 'Please select question',
                        }
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: 350 }}
                        options={listOfQuestions}
                        placeholder="Question"
                    />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'mark']}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter question mark',
                        },
                        () => ({
                          validator(_, value) {
                            if (isNaN(value) || Number(value) <= 0) {
                              return Promise.reject(new Error('Mark must be an positive number and greater than 0'));
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input placeholder="Mark"  />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item style={{ paddingRight: '20px' }}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add question
                  </Button>
                </Form.Item>
              </>
            )
          }
        }
      </Form.List>
    )}
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px",
          }}
        >
          <Button type="primary" htmlType="submit">
            {selectedExcerciseInfo ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateExcerciseModal;
