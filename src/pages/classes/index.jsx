import { Tabs } from "antd";
import TeachingClass from "./teaching";
import LearningClass from "./learning";

const ClassesPage = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Teaching",
      width: "100%",
      children: <TeachingClass />,
    },
    {
      key: "2",
      label: "Learning",
      width: "100%",
      children: <LearningClass />,
    },
  ];

  return (
    <Tabs type="card" defaultActiveKey="1" items={items} onChange={onChange} />
  );
};

export default ClassesPage;
