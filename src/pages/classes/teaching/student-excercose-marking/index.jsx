import { useState, useEffect } from 'react'
import { DoingExcercise } from '../../../excercise/do';
import useAxios from '../../../../hooks/useAxios';
import { useParams } from 'react-router-dom';

const DUMMY = {
  "questions": [
      {
          "question_id": 4,
          "mark": "4",
          "question": {
              "id": 4,
              "question_name": "Multiple choice question 1",
              "question": "<p>Which of the following is a cross-platform, open-source framework for building modern, cloud-based, internet-connected applications?</p>",
              "explain": "The correct answer is .NET Core because it is a cross-platform, open-source framework that allows developers to create applications that can run on Windows, macOS, and Linux. It is designed for building modern, cloud-based, internet-connected applications, making it the best choice among the options provided.",
              "answers": "[\"ASP.NET MVC\",\"Entity Framework\",\"C#\",\".NET Core\"]",
              "correct_answer": 3,
              "question_type": 0,
              "created_at": "2024-05-08T13:29:05.000000Z",
              "updated_at": "2024-05-08T13:29:05.000000Z"
          }
      },
      {
          "question_id": 5,
          "mark": "7",
          "question": {
              "id": 4,
              "question_name": "Multiple choice question 1",
              "question": "<p>What is Vuejs?</p>",
              "explain": "The correct answer is .NET Core because it is a cross-platform, open-source framework that allows developers to create applications that can run on Windows, macOS, and Linux. It is designed for building modern, cloud-based, internet-connected applications, making it the best choice among the options provided.",
              "question_type": 1,
              "created_at": "2024-05-08T13:29:05.000000Z",
              "updated_at": "2024-05-08T13:29:05.000000Z"
          }
      }
  ],
  "marks": [
      4,
      7
  ],
  "correctAnswers": [
      3,
      null
  ],
  "userAnswers": [
      3,
      "asdasdasdasdasdasdasd"
  ],
  "userMarks": [
      4,
      0
  ],
  "teacherComments": [
      "123",
      ""
  ]
}

const StudentExcerciseMarking = () => {
  const [questions, setQuestions] = useState();
  const [marks, setMarks] = useState();
  const [userAnswers, setUserAnswers] = useState();
  const [correctAnswers, setCorrectAnswers] = useState();
  const [userMarks, setUserMarks] = useState();
  const [teacherComments, setTeacherComments] = useState();
  const { api } = useAxios();
  const { classId, excerciseId, studentId } = useParams();

  useEffect(() => {
    setQuestions(DUMMY.questions);
    setMarks(DUMMY.marks);
    setCorrectAnswers(DUMMY.correctAnswers);
    setUserMarks(DUMMY.userMarks);
    setTeacherComments(DUMMY.teacherComments);
    setUserAnswers(DUMMY.userAnswers);
  }, []);

  const getAnswerDetail = async () => {
    try {
      const { data } = await api.get(`/user/answer-detail/${classId}/${excerciseId}/${studentId}`);
      console.log(data, 'data');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAnswerDetail();
  }, []);


  return (
    <>
      {questions && (
        <DoingExcercise 
          questions={questions} 
          marks={marks} showFeedBack={true} 
          hasComment={true} 
          correctAnswers={correctAnswers} 
          userAnswers={userAnswers} 
          userMarks={userMarks} 
          setUserMarks={setUserMarks}  
          teacherComments={teacherComments}
          setTeacherComments={setTeacherComments}
        />
      )}
    </>
  )
}

export default StudentExcerciseMarking;