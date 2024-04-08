import { useState } from 'react';
import { BiMoviePlay } from 'react-icons/bi';
import styles from './styles.module.scss';

const ListVideoInChapter = () => {
  const [videos, setVideos] = useState([]);

  return (
    <>
      <div className={styles.video}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>
            <BiMoviePlay
              style={{
                fontSize: '17px',
                marginRight: '10px',
                marginTop: '10px'
              }}
            />
          </span>
          <span>AWS Free Tier Overview</span>
        </div>
        <div>05:20</div>
      </div>
      <div className={styles.video}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>
            <BiMoviePlay
              style={{
                fontSize: '17px',
                marginRight: '10px',
                marginTop: '10px'
              }}
            />
          </span>
          <span>AWS Free Tier Overview</span>
        </div>
        <div>05:20</div>
      </div>
      <div className={styles.video}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>
            <BiMoviePlay
              style={{
                fontSize: '17px',
                marginRight: '10px',
                marginTop: '10px'
              }}
            />
          </span>
          <span>AWS Free Tier Overview</span>
        </div>
        <div>05:20</div>
      </div>
    </>
  );
};

export default ListVideoInChapter;