import React from "react";
import { Avatar, List, Switch } from "antd";
import { useNavigate } from "react-router-dom";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const ClassExcercisePage = () => {
  const navigate = useNavigate();

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <a key="list-loadmore-more" onClick={() => navigate("2/excercies")}>
              Take excercise
            </a>,
          ]}
        >
          <List.Item.Meta
            // avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<a href="https://ant.design">{item.title}</a>}
            description={<div>Number of questions</div>}
          />
        </List.Item>
      )}
    />
  );
};

export default ClassExcercisePage;
