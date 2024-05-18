import { useState, useEffect } from 'react'
import { List } from 'antd';
import { Link, useParams } from 'react-router-dom';
import useAxios from '../../../../hooks/useAxios';

const OnlineClassExcercisePage = () => {
  const [excercies, setExercises] = useState([]);
  const { api } = useAxios();
  const { id } = useParams();

  const getExercises = async () => {
    try {
      const { data }  = await api.get(`/user/list-excercise-teaching/${id}`);
      setExercises(data.excercises)
      console.log(data, 'data');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <List
    itemLayout="horizontal"
    dataSource={excercies}
    renderItem={(item, index) => (
      <List.Item
       actions={[
          // eslint-disable-next-line react/no-unescaped-entities
          <Link key={index} to={`/classes/${id}/excercies/${item.id}`}>View learner's submissions</Link>
       ]}
      >
        <List.Item.Meta
          title={<span>{item.excercise_name}</span>}
          description={
            <div>
              <div>Number of questions: {JSON.parse(item.excercise_content).length}</div>
              <div>Total mark: {JSON.parse(item.excercise_content).map(item => +item.mark).reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
              )}
              </div>
            </div>
          }
        />
    </List.Item>
    )}
  />
  )
}

export default OnlineClassExcercisePage