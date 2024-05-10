import { Table, Tag, Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const LearningClass = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Class name",
      dataIndex: "class_name",
      key: "class_name",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Course name",
      dataIndex: "course_name",
      key: "course_name",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Lecturer",
      dataIndex: "lecturer",
      key: "lecturer",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "",
      key: "action",
      render: (_, { id }) => {
        return (
          <Button type="link" onClick={() => navigate("1/excercises")}>
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
          <Search
            placeholder="Search by email"
            enterButton="Search"
            size="middle"
            // onChange={e => setSearchEmail(e.target.value)}
            // onSearch={() => getUsers(1)}
          />
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

export default LearningClass;
