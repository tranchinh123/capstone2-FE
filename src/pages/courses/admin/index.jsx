import { useEffect, useState } from 'react';
import { Table, Tag, Dropdown, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import useAxios from '../../../hooks/useAxios';

const AdminCoursePage = () => {
  const [courses, setCourses] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);  
  const [selectedCourse, setSelectedCourse] = useState();
  const { api } = useAxios();
  const navigate = useNavigate();
  
  const items = [
    {
      label: (
        <a
          type="button"
          onClick={() => navigate(`/course-manage-description/${selectedCourse}`)}
        >
          Manage course description
        </a>
      ),
      key: '0'
    },
    {
      label: (
        <a type="button" onClick={() => navigate(`/course-manage-content/${selectedCourse}`)}>
          Manage course content
        </a>
      ),
      key: '1'
    }
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'cource_name',
      key: 'cource_name'
    },
    {
      title: 'Introduction',
      dataIndex: 'cource_introduce',
      key: 'cource_introduce',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: 'Instructor',
      dataIndex: 'instructor',
      key: 'instructor'
    },
    {
      title: 'Type',
      key: 'cource_type',
      dataIndex: 'cource_type',
      render: (_, { cource_type }) => {
        const text = cource_type === 0 ? 'Online' : 'Offline';
        return (
          <span>{text}</span>
        )
      }
    },
    {
      title: 'Status',
      key: 'is_block',
      dataIndex: 'is_block',
      render: (_, { is_block }) => {
        let color = is_block === 1 ? 'cyan' : 'green';
        let text = is_block === 1 ? 'PUBLIC' : 'UNPUBLIC';
        return (
          <Tag color={color}>
            {text}
          </Tag>
        )
      }
    },
    {
      title: '',
      key: 'action',
      // render: (_, record) => (
      render: (_, record) => (
        <Dropdown
          menu={{
            items
          }}
          trigger={['click']}
          onClick={() => setSelectedCourse(record.id)}
        >
          <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
            <BsThreeDots />
          </a>
        </Dropdown>
      )
    }
  ];

  const getCourses = async () => {
    window.showLoading(true);
    try {
      const { data } = await api.post('/admin/cource/get-data?page=1', {
        cource_name: ''
      });
      setCurrentPage(data.cources.current_page);
      setTotalPage(data.cources.last_page);
      setCourses(data.cources.data);
      window.showLoading(false);
    } catch (error) {
      window.showLoading(false);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);
  
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px'
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/course-create')}
        >
          New Course
        </Button>
      </div>
      <Table columns={columns} dataSource={courses} />
    </>
  );
};

export default AdminCoursePage;