import AdminCoursePage from './admin';
import UserCoursePage from './user';
import { useAppContext } from '../../contexts/MainContext';

const CoursePage = () => {
const { user } = useAppContext();

return (
  <>
  {user.role === 1 && <AdminCoursePage />} 
      {user.role !== 1 && <UserCoursePage />} 
    </>
  );
};

export default CoursePage;