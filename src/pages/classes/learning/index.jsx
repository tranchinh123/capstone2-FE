import { useState, useEffect } from 'react';
import { Table, Tag, Button, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';


const { Search } = Input;
const LearningClass = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [classes, setClasses] = useState([]);
  const [searchClassName, setSearchClassName] = useState('');
  const navigate = useNavigate();
  const { api } = useAxios();

  const getLearning = async (getFirstPage) => {
    try {
      const { data } = await api.post(`/user/my-class-learning?page=${getFirstPage ? '1' : currentPage}`, {
        cource_name: searchClassName
      })
      setCurrentPage(data.classes.current_page);
      setLastPage(data.classes.last_page);
      setClasses(data.classes.data);
      console.log(data, 'data');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLearning();
  }, [currentPage])

  const columns = [
    {
      title: 'Class name',
      dataIndex: 'class_name',
      key: 'class_name',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: 'Course name',
      dataIndex: 'cource_name',
      key: 'cource_name',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: 'Lecturer',
      dataIndex: 'teacher_name',
      key: 'teacher_name',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      ellipsis: {
        showTitle: true,
      },
      render: (_, { duration }) => {
        return (
          <span>{`${JSON.parse(duration)[0]} -> ${JSON.parse(duration)[1]}`}</span>
        )
      }
    },
    {
      title: '',
      key: 'action',
      render: (_, { id }) => {
        return (
          <Button type='link' onClick={() => navigate(`${id}/excercises`)}>View details</Button>
        )
      }
    },
  ];

  const handlePageChange = (value) => {
    setCurrentPage(value);
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <Search
            placeholder="Search by course name"
            enterButton="Search"
            size="middle"
            onChange={e => setSearchClassName(e.target.value)}
            onSearch={() => getLearning(true)}
          />
        </div>
      </div>
      <Table 
        columns={columns} 
        dataSource={classes}
          pagination={{
          current: currentPage,
          total: lastPage * 10,
          onChange: handlePageChange,
          showSizeChanger: false
        }}
      />
    </>
  )
}

export default LearningClass