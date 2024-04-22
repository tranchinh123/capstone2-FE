import { Button, Breadcrumb, Popconfirm } from 'antd';
import useAxios from '../../../hooks/useAxios';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import CreateCourseForm from '../form/CreateCourseForm';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';


const CreateAndManageCourse = ({ propCourse, handleGetCourseInfo }) => {
  const { api } = useAxios();
  const navigate = useNavigate();

  const confirm = () => {
    handleDeleteCourse();
  };

  const handleDeleteCourse = async () => {
     try {
      await api.get(`/admin/cource/destroy/${propCourse.id}`);
      window.openNoti('Message', `Delete the code successfully.`);
      navigate('/courses');
     } catch (error) {
      window.openNoti('Message', `Failed to delete the course.`);
     }
  }

  const handleChangeStatus = async () => {
    try {
      await api.get(`/admin/cource/update-status/${propCourse.id}`);
      handleGetCourseInfo()
      window.openNoti('Message', `Update code's status successfully.`);
    } catch (error) {
      window.openNoti('Message', `Failed to update code's status.`);
    }
  }

    return (
        <>
        <Breadcrumb
          style={{ marginBottom: '10px' }}
          items={[
            {
              title: <Link to="/courses">Courses</Link>
            },
            {
              title: 'Create setup'
            }
          ]}
        />
        <div className={styles.createAndManageCourse}>
          <div className={styles.createAndManageCourseHeader}>
            <h1>Course setup</h1>
            <div className={styles.createAndManageCourseAction}>
            {propCourse && <Button type="text" onClick={handleChangeStatus}>{(propCourse.is_block === 1) ? 'Publish' : 'Unpublish' }</Button>}
           {propCourse && (
              <Popconfirm
                title="Delete the course"
                description="Are you sure to delete this course?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" icon={<DeleteOutlined />} />
              </Popconfirm>
           )}
            </div>
          </div>
          <div className={styles.createAndManageCourseForm}>
          <CreateCourseForm propCourse={propCourse} />
            </div>
        </div>
        </>
    );
};

export default CreateAndManageCourse;