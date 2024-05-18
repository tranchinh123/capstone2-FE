import { useState, useEffect } from 'react';
import { Table, Input, Dropdown } from 'antd';
import useAxios from '../../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';

const { Search } = Input;
const TeachingClass = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();
  const { api } = useAxios();

  const items = [
    {
      label: (
        <a
          type="button"
          onClick={() => navigate(`/classes/2/students`)}
        >
          Manage users
        </a>
      ),
      key: '0'
    },
    {
      label: (
        <a type="button" onClick={() => navigate(`/classes/online/${selectedClass}/excercises`)}>
          Manage excercises
        </a>
      ),
      key: '1'
    }
  ];

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
      title: 'Number of students',
      dataIndex: 'numb_of_students',
      key: 'numb_of_students',
      ellipsis: {
        showTitle: true,
      },
      render: (_, { students }) => {
          const numbOfStudents = JSON.parse(students).length;
          return (
            <span>{numbOfStudents}</span>
          )
      }
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      ellipsis: {
        showTitle: true,
      },
      render: (_, { duration }) => {
          const parsedDuration = JSON.parse(duration);
          return (
            <span>{`${parsedDuration[0]} -> ${parsedDuration[1]}`}</span>
          )
      }
    },
    {
      title: '',
      key: 'action',
      render: (_, { id }) => {
        return (
          <>
            <Dropdown
              menu={{
                items
              }}
              trigger={['click']}
              onClick={() => setSelectedClass(id)}
            >
              <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
                <BsThreeDots />
              </a>
            </Dropdown>
          </>
        )
      }
    },
  ];

  const handlePageChange = (e) => {
    setCurrentPage(e.target.value);
  }

  const getClassTeaching = async () => {
    try {
      const { data } = await api.post(`/user/my-class-teaching`, {
        cource_name: ''
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
    getClassTeaching();
  }, []);


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

export default TeachingClass