import { useEffect, useState } from "react";
import { Table, Tag, Dropdown, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import useAxios from "../../../hooks/useAxios";
const { Search } = Input;

const AdminCoursePage = () => {
  const [courses, setCourses] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState();
  const [searchName, setSearchName] = useState("");
  const { api } = useAxios();
  const navigate = useNavigate();

  const items = [
    {
      label: (
        <a
          type="button"
          onClick={() =>
            navigate(`/course-manage-description/${selectedCourse}`)
          }
        >
          Manage course description
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          type="button"
          onClick={() => navigate(`/course-manage-content/${selectedCourse}`)}
        >
          Manage course content
        </a>
      ),
      key: "1",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "cource_name",
      key: "cource_name",
    },
    {
      title: "Introduction",
      dataIndex: "cource_introduce",
      key: "cource_introduce",
      ellipsis: {
        showTitle: true,
      },
    },
    // {
    //   title: 'Instructor',
    //   dataIndex: 'instructor',
    //   key: 'instructor'
    // },
    {
      title: "Type",
      key: "cource_type",
      dataIndex: "cource_type",
      render: (_, { cource_type }) => {
        const text = cource_type === 0 ? "Online" : "Offline";
        return <span>{text}</span>;
      },
    },
    {
      title: "Status",
      key: "is_block",
      dataIndex: "is_block",
      render: (_, { is_block }) => {
<<<<<<< HEAD
        let color = is_block === 1 ? 'cyan' : 'green';
        let text = is_block === 1 ? 'UNPUBLIC' : 'PUBLIC';
        return (
          <Tag color={color}>
            {text}
          </Tag>
        )
      }
=======
        let color = is_block === 1 ? "cyan" : "green";
        let text = is_block === 1 ? "UNPUBLIC" : "PUBLIC";
        return <Tag color={color}>{text}</Tag>;
      },
>>>>>>> doing-onl-off-excercise
    },
    {
      title: "",
      key: "action",
      // render: (_, record) => (
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          onClick={() => setSelectedCourse(record.id)}
        >
          <a style={{ color: "black" }} onClick={(e) => e.preventDefault()}>
            <BsThreeDots />
          </a>
        </Dropdown>
      ),
    },
  ];

  const getCourses = async (getFirstPage) => {
    window.showLoading(true);
    try {
      const { data } = await api.post(
        `/admin/cource/get-data?page=${getFirstPage ? "1" : currentPage}`,
        {
          cource_name: searchName,
        }
      );
      setCurrentPage(data.cources.current_page);
      setLastPage(data.cources.last_page);
      setCourses(data.cources.data);
      window.showLoading(false);
    } catch (error) {
      if (error.response.data.error === "There are no cources in the system") {
        setCurrentPage(1);
        setLastPage(1);
        setCourses([]);
      }
      window.showLoading(false);
    }
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getCourses();
  }, [currentPage]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Search
          style={{ width: "300px" }}
          placeholder="Search by class name"
          enterButton="Search"
          size="middle"
          onChange={(e) => setSearchName(e.target.value)}
          onSearch={() => getCourses(true)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/course-create")}
        >
          New Course
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={courses}
        pagination={{
          current: currentPage,
          total: lastPage * 10,
          onChange: handlePageChange,
          showSizeChanger: false,
        }}
      />
    </>
  );
};

export default AdminCoursePage;
