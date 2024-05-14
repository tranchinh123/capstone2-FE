import { useState, useEffect } from "react";
import CourseCard from "../../../components/common/course-card";
import { Collapse, Input, Button, Pagination, Radio, Space, Empty } from "antd";
import useAxios from "../../../hooks/useAxios";

const UserCoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [type, setType] = useState(-1);
  const [state, setState] = useState(-1);
  const [searchValue, setSearchValue] = useState("");

  const handleChangeType = (e) => {
    setType(e.target.value);
    setCurrentPage(1);
  };

  const handleChangeState = (e) => {
    setState(e.target.value);
    setCurrentPage(1);
  };

  const items = [
    {
      key: "1",
      label: "Course name",
      children: (
        <>
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              placeholder="Search by course name"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button type="primary" onClick={() => getCourses(true)}>
              Search
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Type of course:",
      children: (
        <>
          <Radio.Group onChange={handleChangeType} value={type}>
            <Space direction="vertical">
              <Radio value={-1}>Both</Radio>
              <Radio value={0}>Online</Radio>
              <Radio value={1}>Offline</Radio>
            </Space>
          </Radio.Group>
        </>
      ),
    },
    {
      key: "3",
      label: "State",
      children: (
        <>
          <Radio.Group onChange={handleChangeState} value={state}>
            <Space direction="vertical">
              <Radio value={-1}>Both</Radio>
              <Radio value={0}>Unregistered</Radio>
              <Radio value={1}>Registered</Radio>
            </Space>
          </Radio.Group>
        </>
      ),
    },
  ];

  const { api } = useAxios();

  const getCourses = async (reset) => {
    const body = {};
    if (searchValue) {
      body.cource_name = searchValue;
    }
    if (type !== -1 && !reset) {
      body.cource_type = type;
    }
    if (state !== -1 && !reset) {
      body.is_register = state;
    }

    try {
      window.showLoading(true);
      const { data } = await api.post(
        `/user/list-cource?page=${reset ? "1" : currentPage}`,
        body
      );
      setCourses(data.cources.data);
      setCurrentPage(data.cources.current_page);
      setLastPage(data.cources.last_page);
      window.showLoading(false);
    } catch (error) {
      if (error.response.data.error === "There are no cources in the system") {
        setCourses([]);
        setCurrentPage(1);
        setLastPage(1);
      }
      window.showLoading(false);
    }
    if (reset) {
      setType(-1);
      setState(-1);
    }
  };

  useEffect(() => {
    getCourses();
  }, [currentPage, type, state]);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div style={{ flex: "1" }}>
        <Collapse
          items={items}
          bordered={false}
          defaultActiveKey={["1", "2", "3"]}
        />
      </div>
      <div
        style={{
          flex: "3",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {courses.length === 0 && <Empty />}
        {courses.map((c) => (
          <CourseCard
            key={c.id}
            id={c.id}
            img={c.cource_image}
            name={c.cource_name}
            introduction={c.cource_introduce}
            chapters={JSON.parse(c.chapter)}
          />
        ))}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            defaultCurrent={currentPage}
            total={lastPage * 10}
            onChange={(value) => setCurrentPage(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCoursePage;
