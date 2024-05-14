import { useEffect, useState } from "react";
import { Select, Collapse, Input, Button, Tooltip } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { CiBoxList } from "react-icons/ci";
import ReactQuill from "react-quill";
import { modules } from "../../constants/RichTextEditorModules";
import { numberToLetter } from "../../constants/numberToLetter";
import AICreate from "./create/ai-create";
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.scss";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const INITIAL_MULTIPLE_QUESTION = {
  // type: 0,
  // question: '',
  answers: ["", "", "", ""],
  correct_answer: null,
  // mark: null,
  explain: "",
  question_name: "",
};

const INITIAL_ESSAY_QUESTION = {
  // type: 1,
  // question: '',
  // mark: null,
  explain: "",
  question_name: "",
};

const EditAndCreateQuestion = () => {
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const [questionInfo, setQuestionInfo] = useState(null);
  const [question, setQuestion] = useState("");
  const [openAIPanel, setOpenAIPanel] = useState(false);
  const { api } = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetQuestionInfo = async () => {
      try {
        const { data } = await api.get(`/admin/question/get-data/${id}`);
        let questionInfo;
        if (data.question.question_type === 0) {
          questionInfo = {
            answers: JSON.parse(data.question.answers),
            correct_answer: data.question.correct_answer,
            explain: data.question.explain,
            question_name: data.question?.question_name,
          };
        } else {
          questionInfo = {
            explain: data.question.explain,
            question_name: data.question?.question_name,
          };
        }
        setQuestion(data.question.question);
        setQuestionInfo(questionInfo);
        setSelectedQuestionType(data.question.question_type);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      handleGetQuestionInfo();
    }
  }, []);

  const handleChangeSelectedQuestionType = (value) => {
    if (value === 1) {
      setQuestionInfo(INITIAL_ESSAY_QUESTION);
    }
    if (value === 0) {
      setQuestionInfo(INITIAL_MULTIPLE_QUESTION);
    }
    setSelectedQuestionType(value);
  };

  const handleChangeQuestion = (value) => {
    console.log(value);
    // const newQuestionInfo = {...questionInfo};
    // if(newQuestionInfo?.type === undefined) return;
    // newQuestionInfo.question = value;
    // setQuestionInfo(newQuestionInfo);
    setQuestion(value);
  };

  const handleCorrectAnswerChange = (idx) => {
    const newQuestionInfo = { ...questionInfo };
    newQuestionInfo.correct_answer = idx;
    setQuestionInfo(newQuestionInfo);
  };

  const handleChangeAnswer = (e, idx) => {
    const newQuestionInfo = { ...questionInfo };
    newQuestionInfo.answers[idx] = e.target.value;
    setQuestionInfo(newQuestionInfo);
  };

  const handleDeleteAnswer = (_idx) => {
    const newQuestionInfo = { ...questionInfo };
    newQuestionInfo.answers = newQuestionInfo.answers.filter(
      (_, idx) => idx !== _idx
    );
    setQuestionInfo(newQuestionInfo);
  };

  const handleAddMoreAnswer = () => {
    const newQuestionInfo = { ...questionInfo };
    newQuestionInfo.answers = [...newQuestionInfo.answers, ""];
    setQuestionInfo(newQuestionInfo);
  };

  const handleChangeExplain = (value) => {
    const newQuestionInfo = { ...questionInfo };
    newQuestionInfo.explain = value;
    setQuestionInfo(newQuestionInfo);
  };

  const handleChangeQuestionName = (value) => {
    const newQuestionInfo = { ...questionInfo };
    newQuestionInfo.question_name = value;
    setQuestionInfo(newQuestionInfo);
  };

  const handleAIQuestionCreate = (result) => {
    const newQuestionInfo = { ...questionInfo };
    newQuestionInfo.answers = result.answers;
    newQuestionInfo.explain = result.explain;
    newQuestionInfo.correct_answer = result.correct_answer;
    // newQuestionInfo.question = result.question;
    result?.answers ? setSelectedQuestionType(0) : setSelectedQuestionType(1);
    setQuestion(result.question);
    setQuestionInfo(newQuestionInfo);
  };

  const handleCreateQuestion = async () => {
    if (selectedQuestionType === 0) {
      if (questionInfo.answers.includes("")) {
        window.openNoti("Message", "Option can not be empty.");
        return;
      }

      if (new Set(questionInfo.answers).size !== questionInfo.answers.length) {
        window.openNoti("Message", "The answer values ​​cannot overlap.");
        return;
      }

      if (questionInfo.correct_answer === null) {
        window.openNoti("Message", "Please select correct answer.");
        return;
      }
    }

    if (question === "<p><br></p>") {
      window.openNoti("Message", "Please enter question content.");
      return;
    }

    if (
      questionInfo.question_name === "" ||
      questionInfo.question_name === undefined
    ) {
      window.openNoti("Message", "Please enter question name.");
      return;
    }

    if (questionInfo.explain === "") {
      window.openNoti("Message", "Please enter explain.");
      return;
    }

    const newQuestion = { ...questionInfo, question };
    console.log(question, "question");

    try {
      window.showLoading(true);
      await api.post(`/admin/question/${id ? "update" : "create"}`, {
        id: id,
        question: newQuestion?.question,
        explain: newQuestion?.explain,
        answers: JSON.stringify(newQuestion?.answers),
        correct_answer: newQuestion?.correct_answer,
        question_type: selectedQuestionType,
        question_name: newQuestion?.question_name,
        // changed_schedules: 1/0
      });
      window.showLoading(false);
      window.openNoti(
        "Message",
        `${id ? "Update" : "Create"} new question successfully`
      );
      navigate("/question");
    } catch (error) {
      window.showLoading(false);
      window.openNoti(
        "Message",
        `Failed to ${id ? "update" : "create"} new question`
      );
      console.log(error);
    }
  };

  return (
    <>
      {openAIPanel && (
        <AICreate
          open={openAIPanel}
          setOpen={setOpenAIPanel}
          handleAIQuestionCreate={handleAIQuestionCreate}
        />
      )}
      {!id && (
        <div className={styles.excerciseEditPage}>
          <Select
            style={{
              width: 350,
            }}
            size="large"
            // onChange={(value) => setSelectedQuestionType(value)}
            value={selectedQuestionType}
            onChange={(value) => handleChangeSelectedQuestionType(value)}
            placeholder={
              <div className={styles.selectPlaceHolder}>
                <PlusOutlined />
                Add a new question
              </div>
            }
            options={[
              {
                value: 0,
                label: "Multiple Choices quetion",
              },
              {
                value: 1,
                label: "Essay question",
              },
            ]}
          />
          <span style={{ padding: "0 10px" }}>OR</span>
          <Button
            style={{
              width: 350,
              height: 41,
              fontSize: "15px",
            }}
            onClick={() => setOpenAIPanel(true)}
          >
            Create question with AI
          </Button>
        </div>
      )}
      {selectedQuestionType !== null && (
        <Collapse
          collapsible="header"
          defaultActiveKey={["1"]}
          style={{
            marginTop: "50px",
          }}
          items={[
            {
              key: "1",
              label: (
                <h3>
                  <CiBoxList style={{ width: "15px", height: "15px" }} />{" "}
                  Question
                </h3>
              ),
              children: (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 1fr",
                    gap: "30px",
                  }}
                >
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <h4>Question name</h4>
                      <Input
                        value={questionInfo.question_name}
                        onChange={(e) =>
                          handleChangeQuestionName(e.target.value)
                        }
                      />
                    </div>
                    <h4>Question content</h4>
                    {/* <ReactQuill theme="snow" modules={modules} value={questionInfo?.question} onChange={handleChangeQuestion} /> */}
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      value={question}
                      onChange={handleChangeQuestion}
                    />
                    {selectedQuestionType === 0 && (
                      <div className={styles.inputs}>
                        {questionInfo?.answers?.map((answer, idx) => (
                          <div className={styles.inputWrapper} key={idx}>
                            <span style={{ paddingTop: "5px" }}>
                              {numberToLetter(idx + 1)}
                            </span>
                            <Input
                              value={answer}
                              onChange={(e) => handleChangeAnswer(e, idx)}
                            />
                            <FaRegTrashAlt
                              className={styles.trashIcon}
                              onClick={() => handleDeleteAnswer(idx)}
                            />
                            <div
                              className={styles.checkIcon}
                              style={{
                                background:
                                  questionInfo?.correct_answer === idx
                                    ? "green"
                                    : "#7d848b",
                              }}
                              onClick={() => handleCorrectAnswerChange(idx)}
                            >
                              <CheckOutlined style={{ color: "white" }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    {/* <h3>
                      <FileDoneOutlined /> {'   '} Question mark
                    </h3>
                    <Input value={questionInfo?.mark} onChange={(e) => setQuestionInfo({ ...questionInfo, mark: +e.target.value })} /> */}
                    <TextArea
                      style={{ marginTop: "20px" }}
                      value={questionInfo?.explain}
                      onChange={(e) => handleChangeExplain(e.target.value)}
                      placeholder="Explaination/Hint...."
                      autoSize={{
                        minRows: 3,
                      }}
                    />
                    <Button
                      type="primary"
                      style={{ marginTop: "10px", width: "100%" }}
                      onClick={handleCreateQuestion}
                    >
                      {id ? "Update" : "Create"}
                    </Button>
                    <p style={{ marginTop: "4px" }}>
                      Correct answer{"  "}
                      <Tooltip title="Click ✓ to select the correct answer for the question">
                        <FiAlertCircle />
                      </Tooltip>
                    </p>
                  </div>
                  {selectedQuestionType === 0 && (
                    <Button
                      type="text"
                      style={{ fontWeight: "bold" }}
                      onClick={handleAddMoreAnswer}
                    >
                      + Add choice
                    </Button>
                  )}
                </div>
              ),
            },
          ]}
        />
      )}
    </>
  );
};

export default EditAndCreateQuestion;
