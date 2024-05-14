import { useEffect, useState, useRef } from "react";
import { Collapse, Input, Alert, Button, Popconfirm } from "antd";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const { TextArea } = Input;
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const DoingExcercisePage = ({
  showFeedBack,
  hasComment = true,
  online = true,
}) => {
  const { api } = useAxios();
  const { courseId, excerciseId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [marks, setMarks] = useState([]);
  const [userMarks, setUserMarks] = useState([]);
  const [isFinal, setFinal] = useState(undefined);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const navigate = useNavigate();

  const DUMMY = [
    {
      question_id: 4,
      mark: "4",
      question: {
        id: 4,
        question_name: "Multiple choice question 1",
        question:
          "<p>Which of the following is a cross-platform, open-source framework for building modern, cloud-based, internet-connected applications?</p>",
        explain:
          "The correct answer is .NET Core because it is a cross-platform, open-source framework that allows developers to create applications that can run on Windows, macOS, and Linux. It is designed for building modern, cloud-based, internet-connected applications, making it the best choice among the options provided.",
        answers: '["ASP.NET MVC","Entity Framework","C#",".NET Core"]',
        correct_answer: 3,
        question_type: 0,
        created_at: "2024-05-08T13:29:05.000000Z",
        updated_at: "2024-05-08T13:29:05.000000Z",
      },
    },
    {
      question_id: 5,
      mark: "7",
      question: {
        id: 4,
        question_name: "Multiple choice question 1",
        question: "<p>What is Vuejs?</p>",
        explain:
          "The correct answer is .NET Core because it is a cross-platform, open-source framework that allows developers to create applications that can run on Windows, macOS, and Linux. It is designed for building modern, cloud-based, internet-connected applications, making it the best choice among the options provided.",
        question_type: 1,
        created_at: "2024-05-08T13:29:05.000000Z",
        updated_at: "2024-05-08T13:29:05.000000Z",
      },
    },
  ];

  const getExcercise = async () => {
    try {
      const { data } = await api.get(
        `/user/excercise-offline/${courseId}/${excerciseId}`
      );
      console.log(JSON.parse(data.excercise.excercise_content), "data");
      setFinal(Object.values(data)[1]);

      // setMarks(JSON.parse(data.excercise.excercise_content).map(d => +d.mark));
      setMarks(DUMMY.map((d) => +d.mark));

      // setUserMarks(Array.from({ length: JSON.parse(data.excercise.excercise_content).length }, () => 0));
      setUserMarks(Array.from({ length: DUMMY.length }, () => 0));

      // setCorrectAnswers(JSON.parse(data.excercise.excercise_content).map(d => d.question.correct_answer));
      setCorrectAnswers(DUMMY.map((d) => d.question.correct_answer || null));

      // setQuestions(JSON.parse(data.excercise.excercise_content))
      // setUserAnswers(Array.from({ length: JSON.parse(data.excercise.excercise_content).length }, () => null));
      setQuestions(DUMMY);
      setUserAnswers(Array.from({ length: DUMMY.length }, () => null));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (time) => {
    if (online) {
      const detail = {
        questions,
        marks,
        correctAnswers,
        userAnswers,
        userMarks,
        teacherComments: Array.from({ length: questions.length }, () => ""),
      };
      console.log(detail, "detail");
      return;
    }

    const detail = {
      courseId,
      excerciseId,
      marks,
      isFinal,
      correctAnswers,
      userAnswers,
      time_detail: {
        total: 40 * 60,
        spent: 40 * 60 - Number(time),
      },
    };
    localStorage.setItem("detail", JSON.stringify(detail));
    navigate("/result");
  };

  useEffect(() => {
    getExcercise();
  }, []);

  return (
    <>
      {questions && (
        <DoingExcercise
          questions={questions}
          showFeedBack={showFeedBack}
          hasComment={hasComment}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          handleSubmit={handleSubmit}
          correctAnswers={correctAnswers}
          userMarks={userMarks}
          marks={marks}
          setUserMarks={setUserMarks}
        />
      )}
      {/* {questions && <DoingExcercise questions={questions} marks={marks} showFeedBack={true} hasComment={hasComment} correctAnswers={correctAnswers} userAnswers={userAnswers} userMarks={userMarks}  />} */}
    </>
  );
};

export const DoingExcercise = ({
  showFeedBack,
  hasComment,
  questions,
  userAnswers,
  setUserAnswers,
  handleSubmit,
  marks,
  userMarks,
  setUserMarks,
  correctAnswers,
  teacherComments,
  setTeacherComments,
}) => {
  const remainingTimeRef = useRef();

  const confirm = () => {
    handleSubmit(remainingTimeRef.current);
  };

  const handleMutipleChoice = (e) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[e.target.name] = +e.target.id;
    if (+e.target.id === correctAnswers[e.target.name]) {
      const newUserMarks = [...userMarks];
      newUserMarks[e.target.name] = marks[e.target.name];
      setUserMarks(newUserMarks);
    }
    setUserAnswers(newUserAnswers);
  };

  const handleShortAnswer = (e) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[e.target.name] = e.target.value;
    setUserAnswers(newUserAnswers);
  };

  const handleChangeComment = (e) => {
    const newComments = [...teacherComments];
    newComments[e.target.name] = e.target.value;
    setTeacherComments(newComments);
  };

  const handleChangeScore = (e) => {
    const newUserMarks = [...userMarks];
    newUserMarks[e.target.name] = +e.target.value;
    setUserMarks(newUserMarks);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0 15px 0",
        }}
      >
        {!showFeedBack && (
          <CountdownCircleTimer
            size={120}
            isPlaying
            duration={40 * 60}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={10}
            onComplete={() => console.log("v")}
            onUpdate={(remainingTime) =>
              (remainingTimeRef.current = remainingTime)
            }
            strokeLinecap="square"
          >
            {({ remainingTime }) => {
              const minutes = Math.floor(remainingTime / 60);
              const seconds = remainingTime % 60;
              return <h1>{`${minutes}:${seconds}`}</h1>;
            }}
          </CountdownCircleTimer>
        )}
      </div>
      <div style={{ maxHeight: "83vh", overflowY: "scroll" }}>
        {questions.map((item, questionIndex) => (
          <Collapse
            key={questionIndex}
            items={[
              {
                key: "1",
                label: `Question ${questionIndex + 1}:`,
                children: (
                  <>
                    {item.question.question_type === 0 ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: `${
                            showFeedBack && hasComment ? "2fr 1fr" : "1fr"
                          }`,
                          gap: "20px",
                        }}
                      >
                        <div className="row">
                          <div className="col-xs-12">
                            <div className="mcq">
                              <h4 style={{ marginBottom: "10px" }}>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: item.question.question,
                                  }}
                                />
                              </h4>
                              {JSON.parse(item.question.answers).map(
                                (answer, answerIndex) => {
                                  return (
                                    <label
                                      key={answerIndex}
                                      className={`mcq-answer ${
                                        showFeedBack &&
                                        answerIndex ===
                                          item.question.correct_answer &&
                                        "correct"
                                      }`}
                                    >
                                      {!showFeedBack && (
                                        <input
                                          type="radio"
                                          name={questionIndex}
                                          id={answerIndex}
                                          onChange={handleMutipleChoice}
                                        />
                                      )}
                                      {showFeedBack && (
                                        <input
                                          type="radio"
                                          name={questionIndex}
                                          id={answerIndex}
                                          checked={
                                            answerIndex ===
                                            userAnswers[questionIndex]
                                          }
                                        />
                                      )}
                                      <div className="highlight"></div>
                                      <div className="circle"></div>
                                      <p>
                                        <span lang="en">{answer}</span>
                                      </p>

                                      {showFeedBack && (
                                        <span className="feedback">
                                          <span lang="en">
                                            {answerIndex ===
                                            item.question.correct_answer
                                              ? "Correct answer"
                                              : "Uncorrect answer"}
                                          </span>
                                        </span>
                                      )}
                                    </label>
                                  );
                                }
                              )}
                              {showFeedBack && (
                                <Alert
                                  message={item.question.explain}
                                  type="success"
                                  style={{ marginTop: "15px" }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        {showFeedBack && hasComment && (
                          <div
                            style={{
                              border: "1px solid #DCDCDC",
                              padding: "15px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "15px",
                            }}
                          >
                            <h5>Score:</h5>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                              }}
                            >
                              <Input
                                style={{ width: "60px" }}
                                value={userMarks[questionIndex]}
                                disabled
                              />
                              <span>/</span>
                              <span>{marks[questionIndex]} </span>
                            </div>
                            <h5>Comments:</h5>
                            <TextArea
                              value={teacherComments[questionIndex]}
                              name={questionIndex}
                              onChange={handleChangeComment}
                              placeholder="comments..."
                              autoSize={{
                                minRows: 4,
                                maxRows: 6,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: `${
                            showFeedBack && hasComment ? "2fr 1fr" : "1fr"
                          }`,
                          gap: "20px",
                        }}
                      >
                        <div className="row">
                          <div className="col-xs-12">
                            <div className="mcq">
                              <h4 style={{ marginBottom: "10px" }}>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: item.question.question,
                                  }}
                                />
                              </h4>
                              <TextArea
                                name={questionIndex}
                                onChange={handleShortAnswer}
                                placeholder="answer..."
                                style={{
                                  height: 120,
                                  resize: "none",
                                }}
                                disabled={showFeedBack}
                              />
                              {showFeedBack && (
                                <Alert
                                  message={item.question.explain}
                                  type="success"
                                  style={{ marginTop: "15px" }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        {showFeedBack && hasComment && (
                          <div
                            style={{
                              border: "1px solid #DCDCDC",
                              padding: "15px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "15px",
                            }}
                          >
                            <h5>Score:</h5>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                              }}
                            >
                              <Input
                                style={{ width: "60px" }}
                                value={userMarks[questionIndex]}
                                name={questionIndex}
                                onChange={handleChangeScore}
                              />
                              <span>/</span>
                              <span>{marks[questionIndex]} </span>
                            </div>
                            <h5>Comments:</h5>
                            <TextArea
                              value={teacherComments[questionIndex]}
                              name={questionIndex}
                              onChange={handleChangeComment}
                              placeholder="comments..."
                              autoSize={{
                                minRows: 4,
                                maxRows: 6,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ),
              },
            ]}
            defaultActiveKey={["1"]}
            style={{ margin: "20px 70px" }}
          />
        ))}
      </div>
      {!showFeedBack && (
        <div style={{ textAlign: "right", margin: "0 74px" }}>
          <Popconfirm
            title="Submit the excercise"
            description="Are you sure to submit this excercise?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Submit</Button>
          </Popconfirm>
        </div>
      )}
    </>
  );
};

export default DoingExcercisePage;
