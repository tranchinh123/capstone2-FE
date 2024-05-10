import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Modal, Select } from "antd";

const CreateExcerciseModal = ({ isModalOpen, setIsModalOpen }) => {
  const onFinish = (values) => {
    const marks = values.excercise.map((val) => val.mark);
  };

  return (
    <Modal
      title="Create excercise"
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
      >
        <Form.List name="excercise">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "question"]}
                    rules={[
                      {
                        required: true,
                        message: "Please select question",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: 350 }}
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                      ]}
                      placeholder="Question"
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "mark"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter question mark",
                      },
                      () => ({
                        validator(_, value) {
                          if (isNaN(value) || Number(value) <= 0) {
                            return Promise.reject(
                              new Error(
                                "Mark must be an positive number and greater than 0"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="Mark" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item style={{ paddingRight: "20px" }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add question
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px",
          }}
        >
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateExcerciseModal;
