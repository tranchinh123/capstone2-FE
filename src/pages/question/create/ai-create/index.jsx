import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Drawer } from "antd";
import OpenAI from "openai";

const AICreate = ({ open, setOpen, handleAIQuestionCreate }) => {
  const [questionType, setQuestionType] = useState(0);
  const [topic, setTopic] = useState();
  const [level, setLevel] = useState();
  const [numbOfQuestions, setNumbOfQuestions] = useState(4);

  const [form] = Form.useForm();

  const onFinish = async () => {
    if (topic === undefined) {
      window.openNoti("Message", "Please enter topic");
      return;
    }
    if (level === undefined) {
      window.openNoti("Message", "Please enter level of difficulty");
      return;
    }
    if (isNaN(+numbOfQuestions) || +numbOfQuestions <= 0) {
      window.openNoti("Message", "Please enter valid number of questions");
      return;
    }
    const openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true,
    });
    const aiModel = "gpt-3.5-turbo-1106";
    const messages1 = [
      {
        role: "user",
        content: `
          I want to create a question about this topic: '${topic}', with these following options:
          1, The level of difficulty for the question is ${level}.
          2, it's multiple choice questions with the number of options is ${numbOfQuestions}.
          3, Give me response with this JSON format: 
            { 
              "answers": ['answers number 1', 'answers number2', ...],
              "correct_answer": 0 (this is index of correct answer in answers array),
              "question": 'Give the question here',
              "explain": 'Give the explaination why choose the given correct answer'
            }
        `,
      },
    ];
    const message2 = [
      {
        role: "user",
        content: `
          I want to create a question about this topic: '${topic}', with these following options:
          1, The level of difficulty for the question is ${level}.
          2, it's an essay question.
          3, Give me response with this JSON format: 
            { 
              "question": 'Give the question here',
              "explain": 'Give the hint to answer the question'
            }
        `,
      },
    ];
    window.showLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        model: aiModel,
        messages: questionType === 0 ? messages1 : message2,
      });
      const aiReponse = completion.choices[0].message.content;
      setOpen(false);
      window.showLoading(false);
      window.openNoti('Message', 'Generate question successfully.')
      handleAIQuestionCreate(JSON.parse(aiReponse));
    } catch (error) {
      window.showLoading(false);
      window.openNoti('Message', 'Failed to generate question.')
    }
  };

  return (
    <Drawer
      title="Create question with AI"
      onClose={() => setOpen(false)}
      open={open}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Type of question"
          name="type"
          required
          initialValue={"multiple choice"}
        >
          <Select
            onChange={(value) => setQuestionType(value)}
            options={[
              {
                value: 0,
                label: "Multiple Choice questions",
              },
              {
                value: 1,
                label: "Essay questions",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Topic" name="topic" required>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
        </Form.Item>
        <Form.Item label="Level of difficulty" name="difficulty" required>
          <Select
            onChange={(value) => setLevel(value)}
            options={[
              {
                value: "easy",
                label: "Easy",
              },
              {
                value: "medium",
                label: "Medium",
              },
              {
                value: "hard",
                label: "Hard",
              },
            ]}
          />
        </Form.Item>
        {questionType === 0 && (
          <Form.Item
            label="Number of options"
            name="options"
            required
            initialValue={numbOfQuestions}
          >
            <Input
              value={numbOfQuestions}
              onChange={(e) => setNumbOfQuestions(e.target.value)}
            />
          </Form.Item>
        )}
        <Button
          htmlType="submit"
          type="primary"
          style={{ width: "100%", marginBottom: "10px" }}
        >
          Create
        </Button>
        <span>
          * Note: When you create new question, if there is currently a
          question, it will overwrite the current question content
        </span>
      </Form>
    </Drawer>
  );
};
export default AICreate;
