import { Card, Progress } from 'antd';
import { IoBookOutline } from 'react-icons/io5';

const CourseCard = () => (
  <Card
    style={{
      width: 320,
      borderRadius: '8px'
    }}
  >
    <img
      style={{
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px'
      }}
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX8CFwswJggZBDP67N7_y6Kul4C60ACf7QgvsKwsztCkdtudAyERD19rdJuHWWRcPd5iQ&usqp=CAU"
      alt=""
    />
    <h3 style={{ color: '#3F7C93' }}>Cinematic Techniques</h3>
    <p style={{ color: '#848588', marginBottom: '5px' }}>Filming</p>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }}
    >
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#DAF4FF',
          padding: '6px',
          paddingTop: '9px',
          borderRadius: '50%'
        }}
      >
        <IoBookOutline />
      </span>
      <span>4 Chapters</span>
    </div>
    <Progress percent={30} strokeColor="#3E98C3" showInfo={false} />
    <p>100% Complete</p>
  </Card>
);
export default CourseCard;
