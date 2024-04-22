import { useState,useEffect } from 'react';
import TeacherCoursePage from './teacher';
import LearnerCoursePage from './learner';
import useAxios from '../../hooks/useAxios';


const CoursePage = () => {
  const [userRole] = useState('teacher');
  const { api } = useAxios();

  const createUser = async () => {
     try {
        const response =  api.post('/admin/user/create', {
          email: 'dangvnhattruong@gmail.com',
          full_name: 'dang van nhat truong',
          address: '193 nui thanh',
          phone: '1234567890'
        })
        console.log(response, 'ádadads');
     } catch (error) {
       console.log(error);
     }
  }

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await api.get("/me");
  //       console.log(data, 'data');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [api]);


  return (
    <>
      <button onClick={() => createUser()}>asdasds</button>
      {/* {userRole === 'teacher' && <TeacherCoursePage />} */}
      {/* {userRole === 'learner' && <LearnerCoursePage />} */}
      {userRole === 'teacher' && <TeacherCoursePage />}
    </>
  );
};

export default CoursePage;
