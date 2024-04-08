import { Collapse, Button } from 'antd';
import { FaHeart } from 'react-icons/fa';
import ListVideoInChapter from './list-video-in-chapter';
import styles from './styles.module.scss';

const CourseDetailPage = () => {
  const items = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <ListVideoInChapter />
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <ListVideoInChapter />
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <ListVideoInChapter />
    }
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className={styles.courseDetailPage}>
      <div className={styles.courseBanner}>
        <img
          src="https://img-c.udemycdn.com/course/240x135/4925150_1295.jpg"
          alt=""
        />
        <div className={styles.courseIntro}>
          <h1>Master Amazon EC2 Storage: Complete Guide for EBS, EFS & AMI</h1>
          <p>
            Block Storage | Object Storage | Elastic Block Store | Snapshots |
            AMIs | Image Builder | Elastic File System (EFS)
          </p>
          <span>Created by YouAccel Training</span>
          <div style={{ alignSelf: 'flex-end' }}>
            <Button type="text">
              <FaHeart style={{ color: 'white', fontSize: '18px' }} />
            </Button>
            <Button
              type="primary"
              style={{
                width: '100px',
                alignSelf: 'flex-end',
                marginLeft: '20px'
              }}
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.courseContent}>
        <h2>Course content</h2>
        <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
        <h2>Description</h2>
      </div>
    </div>
  );
};

export default CourseDetailPage;