import { useState, useEffect } from "react";
import { List, Popconfirm } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";

const ClassExcercisePage = () => {
  const [excercies, setExercises] = useState([]);
  const { api } = useAxios();
  const { id } = useParams();

  const navigate = useNavigate();

  const confirm = () => {
    navigate("/excercise/do/2");
  };

  const getExercises = async () => {
    try {
      const { data } = await api.get(`/user/list-excercise/${id}`);
      setExercises(data.excercises);
      console.log(data, "data");
    } catch (error) {
      console.log(error);
    }
  };

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
            <Popconfirm
              key={index}
              title="Taking the exercise"
              description="Are you sure to take this exercise?"
              onConfirm={() => confirm()}
              okText="Yes"
              cancelText="No"
            >
              <a>Take excercise</a>
            </Popconfirm>,
          ]}
        >
          <List.Item.Meta
            title={<a href="https://ant.design">{item.excercise_name}</a>}
            description={
              <div>
                <div>
                  Number of questions:{" "}
                  {JSON.parse(item.excercise_content).length}
                </div>
                <div>
                  Total mark:{" "}
                  {JSON.parse(item.excercise_content)
                    .map((item) => +item.mark)
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )}
                </div>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default ClassExcercisePage;
