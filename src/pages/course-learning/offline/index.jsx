import { Collapse, Checkbox, Button } from 'antd';
import { BiMoviePlay } from 'react-icons/bi';
import { SnippetsOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

const OfflineCourseLearning = () => {
  const text = (
    <div className={styles.chappterContainer} onClick={() => console.log('a')}>
      <div className={styles.chapterWrapper}>
        <div className={styles.chapterItem}>
          <Checkbox
            style={{ marginTop: '4px' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={() => {}}
          />
          <div className={styles.itemInfo}>
            <span className={styles.itemName}>1. Project Showcase</span>
            <span className={styles.itemTime}>
              <BiMoviePlay className={styles.itemTimeIcon} />
              <span className={styles.itemTimeText}>10min</span>
            </span>
          </div>
        </div>
        <Button
          type="dashed"
          icon={<SnippetsOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            console.log('b');
          }}
        >
          Excercise
        </Button>
      </div>
    </div>
  );

  const items = [
    {
      key: '1',
      label: (
        <>
          <h3>Section 1: Introduction</h3>
          <p>6/7 | 10min </p>
        </>
      ),
      children: text
    },
    {
      key: '2',
      label: (
        <>
          <h3>Section 2: Introduction</h3>
          <p>6/7 | 10min </p>
        </>
      ),
      children: text
    },
    {
      key: '3',
      label: (
        <>
          <h3>Section 3: Introduction</h3>
          <p>6/7 | 10min </p>
        </>
      ),
      children: text
    }
  ];

  return (
    <div className={styles.offlineCourseLearning}>
      <video controls>
        <source src="mov_bbb.mp4" type="video/mp4" />
      </video>
      <div className={styles.collapseWrapper}>
        <Collapse items={items} bordered={false} defaultActiveKey={['1']} />
      </div>
    </div>
  );
};

export default OfflineCourseLearning;