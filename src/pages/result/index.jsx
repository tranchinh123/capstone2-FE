import { useEffect, useState } from "react";
import { Button, Descriptions, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { DoingExcercise } from "../excercise/do";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const [detail, setDetail] = useState();
  const [courseId, setCourseId] = useState();
  const [excerciseId, setExcerciseId] = useState();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const { api } = useAxios();
  const navigate = useNavigate();

  const getExcercise = async () => {
    try {
      const { data } = await api.get(
        `/user/excercise-offline/${courseId}/${excerciseId}`
      );
      console.log(JSON.parse(data.excercise.excercise_content), "data");
      setQuestions(JSON.parse(data.excercise.excercise_content));
    } catch (error) {
      console.log(error);
    }
  };

  const registerCertificate = async (courseId) => {
    try {
      const { data } = await api.get(
        `/user/cource/register-certificate/${courseId}`
      );
      console.log(data, "data");
    } catch (error) {
      console.log(error);
    }
  };

  const borderedItems = [
    {
      key: "1",
      label: "Total score",
      children: detail?.totalScore,
    },
    {
      key: "2",
      label: "Total time",
      children: detail?.totalTime,
    },
    {
      key: "3",
      label: "Spend time",
      children: detail?.spentTime,
    },
    {
      key: "4",
      label: "Score",
      children: detail?.score,
    },
    {
      key: "5",
      label: "Number of correct questions",
      children: `${detail?.correctCount}/${detail?.totalQuestions}`,
    },
    {
      key: "6",
      label: "Status",
      children: detail?.status,
    },
  ];

  useEffect(() => {
    let score = 0;
    let correctCount = 0;
    const detail = JSON.parse(localStorage.getItem("detail"));
    const totalScore = detail.marks.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    detail.correctAnswers.forEach((item, idx) => {
      if (item === detail.userAnswers[idx]) {
        score += detail.marks[idx];
        correctCount++;
      }
    });
    setCourseId(detail.courseId);
    setExcerciseId(detail.excerciseId);
    setUserAnswers(detail.userAnswers);
    setDetail({
      totalScore,
      score,
      totalTime: detail.time_detail.total / 60 + " minutes",
      spentTime:
        detail.time_detail.spent > 60
          ? Math.round(detail.time_detail.spent / 60) + " minutes"
          : Math.round(detail.time_detail.spent) + " seconds",
      totalQuestions: detail.correctAnswers.length,
      status: score >= totalScore * 0.7 ? "PASS" : "FAILED",
      correctCount,
    });
    if (detail.isFinal && score >= totalScore * 0.7) {
      registerCertificate(detail.courseId);
    }
  }, []);

  return (
    <>
      <Result
        icon={<SmileOutlined />}
        title="Great, we have done the excercise!"
        extra={[
          <Button type="primary" key="console" onClick={() => navigate("/")}>
            Back to homepage
          </Button>,
        ]}
      />
      <Descriptions
        style={{ margin: "0 80px" }}
        bordered
        size={"default"}
        items={borderedItems}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {!(questions.length > 0) && (
          <Button type="primary" onClick={getExcercise}>
            Show details
          </Button>
        )}
      </div>
      {questions.length > 0 && (
        <DoingExcercise
          showFeedBack
          questions={questions}
          userAnswers={userAnswers}
        />
      )}
    </>
  );
};

export default ResultPage;
