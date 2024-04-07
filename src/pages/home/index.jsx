import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import styles from './styles.module.scss';

const HomePage = () => {
  const [userRole] = useState('teacher');

  return (
    <>
      {/* {userRole === 'admin' && } */}
      {(userRole === 'teacher' || userRole === 'learner') && (
        <Navigate to="/courses" />
      )}
    </>
  );
};

export default HomePage;