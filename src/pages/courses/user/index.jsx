import CourseCard from '../../../components/common/course-card';
import { Collapse, Input, Button, Select, Pagination } from 'antd';

const UserCoursePage = () => {
  const items = [
    {
      key: '1',
      label: 'Course name:',
      children: (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Input />
          <Button type="primary">Search</Button>
        </div>
      )
    },
    {
      key: '2',
      label: 'Instructor:',
      children: <Select style={{ width: '100%' }} />
    }
  ];
  
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <div style={{ flex: '1' }}>
        <Collapse
          items={items}
          bordered={false}
          defaultActiveKey={['1', '2', '3']}
        />
      </div>
      <div
        style={{
          flex: '3',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  );
};

export default UserCoursePage;