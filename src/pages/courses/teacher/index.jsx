import { Table, Tag, Dropdown, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { BsThreeDots } from "react-icons/bs";

const TeacherCoursePage = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: (
        <a
          type="button"
          onClick={() => navigate("/course-manage-description/1")}
        >
          Manage course description
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a type="button" onClick={() => navigate("/course-manage-content/1")}>
          Manage course content
        </a>
      ),
      key: "1",
    },
  ];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (_, { type }) => (
        <>
          {type.map((t) => {
            return <span key={t}>{t.toUpperCase()}</span>;
          })}
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          {status.map((t) => {
            let color = t.length > 5 ? "geekblue" : "green";
            if (t === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={t}>
                {t.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "",
      key: "action",
      // render: (_, record) => (
      render: () => (
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <a style={{ color: "black" }} onClick={(e) => e.preventDefault()}>
            <BsThreeDots />
          </a>
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      title: "John Brown",
      price: "$32",
      address: "New York No. 1 Lake Park",
      status: ["nice", "developer"],
    },
    {
      key: "2",
      title: "Jim Green",
      price: "$42",
      address: "London No. 1 Lake Park",
      status: ["loser"],
    },
    {
      key: "3",
      title: "Joe Black",
      price: "$32",
      address: "Sydney No. 1 Lake Park",
      status: ["cool", "teacher"],
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/course-create")}
        >
          New Course
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TeacherCoursePage;
