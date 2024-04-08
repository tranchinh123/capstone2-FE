import { Button, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import CreateCourseForm from '../form/CreateCourseForm';

import styles from './styles.module.scss';

const CreateAndManageCourse = () => {
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
              <Button type="text">Publish</Button>
              <Button type="primary" icon={<DeleteOutlined />} />
            </div>
          </div>
          <div className={styles.createAndManageCourseForm}>
            <CreateCourseForm />
            </div>
        </div>
        </>
    );
};

export default CreateAndManageCourse;