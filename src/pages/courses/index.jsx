import { useState } from 'react';
import TeacherCoursePage from './teacher';
import LearnerCoursePage from './learner';

const CoursePage = () => {
  const [userRole] = useState('teacher');

  return (
    <>
      {/* {userRole === 'teacher' && <TeacherCoursePage />} */}
      {/* {userRole === 'learner' && <LearnerCoursePage />} */}
      {userRole === 'teacher' && <LearnerCoursePage />}
    </>
  );
};

export default CoursePage;
