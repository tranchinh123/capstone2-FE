import { useState, useEffect } from 'react';
import { List, Avatar, Tag } from 'antd';
import { useParams, Link } from 'react-router-dom';
import useAxios from '../../../../hooks/useAxios';

const StudentExcercisesPage = () => {
  const [users, setUsers] = useState([]);
  const { api } = useAxios();
  const { classId, excerciseId } = useParams();

  const getUsersDoneExcercise = async () => {
    try {
      const { data } = await api.get(`/user/list-user-done-excercise/${classId}/${excerciseId}`);
      console.log(data, 'data');
      setUsers(data.users);
    } catch (error) {
      console.log(error, 'error');
    }
  }

  useEffect(() => {
    getUsersDoneExcercise();
  }, []);


  return (
    <List
    itemLayout="horizontal"
    dataSource={users}
    renderItem={(item, index) => (
      <List.Item
        actions={[
            // eslint-disable-next-line react/no-unescaped-entities
            <Link key={index} to={`/classes/${classId}/excercies/${excerciseId}/students/${item.id}`}>Grade student</Link>
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar style={{
              backgroundColor: '#1677ff',
            }}
          >
            {item.full_name.slice(0, 1).toUpperCase()}
          </Avatar>}
          title={<span>{item.full_name}</span>}
          description={
            <div style={{ display: 'flex', gap: '10px' }}>
              <span>Status: </span>
              <Tag color="green">
                Marked
              </Tag>
            </div>
          }
        />
      </List.Item>
    )}
  />
  )
}

export default StudentExcercisesPage