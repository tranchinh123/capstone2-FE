import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CreateCourseForm from '../form/CreateCourseForm';

import styles from './styles.module.scss';

const CreateAndManageCourse = () => {
    return (
        // <Collapse />
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
    );
};

export default CreateAndManageCourse;