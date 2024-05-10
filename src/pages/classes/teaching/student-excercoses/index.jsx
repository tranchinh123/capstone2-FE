import { Table, Tag, Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const StudentExcercisesPage = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Excercise name",
      dataIndex: "excercise_name",
      key: "excercise_name",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Number of questions",
      dataIndex: "numb_of_questions",
      key: "numb_of_questions",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Mark",
      dataIndex: "mark",
      key: "mark",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Student mark",
      dataIndex: "student_mark",
      key: "student_mark",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { is_publish }) => {
        const color = is_publish === 1 ? "cyan" : "green";
        const text = is_publish === 1 ? "Not scored" : "Scored";
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, { id }) => {
        return (
          <Button type="link" onClick={() => navigate("3/marking")}>
            View details
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <Select
                placeholder={'Status'}
                style={{
                  width: 120,
                }}
                // onChange={value => setSearchStatus(value)}
                options={[
                  {
                    value: 0,
                    label: 'active',
                  },
                  {
                    value: 1,
                    label: 'unactive',
                  },
                ]}
            /> */}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={[
          {
            class_name: "Class name",
            course_name: "Course name",
            numb_of_students: "4",
            is_publish: 0,
          },
        ]}
        // dataSource={users}
        //   pagination={{
        //   current: currentPage,
        //   total: lastPage * 10,
        //   onChange: handlePageChange,
        //   showSizeChanger: false
        // }}
      />
    </>
  );
};

export default StudentExcercisesPage;
