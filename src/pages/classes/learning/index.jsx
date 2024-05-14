import { useState, useEffect } from "react";
import { Table, Tag, Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const { Search } = Input;
const LearningClass = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const { api } = useAxios();

  const getLearning = async () => {
    try {
      const { data } = await api.post(`/user/my-class-learning`, {
        cource_name: "",
      });
      setClasses(data.classes);
      console.log(data, "data");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLearning();
  }, []);

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
      dataIndex: "cource_name",
      key: "cource_name",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Lecturer",
      dataIndex: "teacher",
      key: "teacher",
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
      render: (_, { duration }) => {
        return (
          <span>{`${JSON.parse(duration)[0]} -> ${
            JSON.parse(duration)[1]
          }`}</span>
        );
      },
    },
    {
      title: "",
      key: "action",
      render: (_, { id }) => {
        return (
          <Button type="link" onClick={() => navigate(`${id}/excercises`)}>
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
        // dataSource={[
        //   {
        //     class_name: 'Class name',
        //     course_name: 'Course name',
        //     numb_of_students: '4',
        //     is_publish: 0
        //   }
        // ]}
        dataSource={classes}
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
