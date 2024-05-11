import { useState, useEffect } from 'react';
import {
  Button,
  Table,
  Dropdown,
  Input
} from 'antd';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { BsThreeDots } from 'react-icons/bs';
import { PlusOutlined } from '@ant-design/icons';
import useAxios from '../../../hooks/useAxios';
const { Search } = Input;

const OnlineCourseManageContent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();
  const { api } = useAxios();
  const { id } = useParams();

  const getClasses = async (getFirstPage) => {
    window.showLoading(true);
    try {
      const { data } = await api.post(`/admin/class/get-data?page=${getFirstPage ? '1' : currentPage}`, {
        class_name: searchName,
        id_cource: id
      })
      setData(data.classes.data);
      setCurrentPage(data.classes.current_page);
      setLastPage(data.classes.last_page);
      window.showLoading(false);
    } catch (error) {
      window.showLoading(false);
    }
  }

  const handleDeleteClass = async () => {
    try {
      window.showLoading(true);
      await api.get(`/admin/class/destroy/${selectedClass}`);
      getClasses(true);
      window.showLoading(false);
      window.openNoti('Message', 'Delete class successfully')
    } catch (error) {
      window.showLoading(false);
      window.openNoti('Message', 'Failed to delete class')
      console.log(error);
    }
  }

  useEffect(() => {
    getClasses();
   }, [currentPage]);

  const items = [
     {
       label: (
         <a
           type="button"
           onClick={() => navigate(String(selectedClass))}
         >
           Edit
         </a>
       ),
       key: '0'
     },
     {
       label: (
         <a type="button" onClick={() => handleDeleteClass()}>
           Delete
         </a>
       ),
       key: '1'
     }
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'class_name',
      key: 'class_name',
    },
    {
      title: 'Number of learners',
      dataIndex: 'learners',
      key: 'learners',
      render: (_, record) => {
        return (
          <span>{JSON.parse(record.students).length}</span>
        )
      }
    },
    {
      title: 'Class time',
      dataIndex: 'class_time',
      key: 'class_time',
      render: (_, record) => {
        const t = JSON.parse(record.time);
        return (
          <span>{t[0]} - {t[1]}</span>
        )
      }
    },
    {
      title: 'Class duration',
      dataIndex: 'class_duration',
      key: 'class_duration',
      render: (_, record) => {
        const d = JSON.parse(record.duration);
        return (
          <span>{d[0]} {'->'} {d[1]}</span>
        )
      }
    },
    {
      title: 'Room ID',
      dataIndex: 'room_id',
      key: 'room_id',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Dropdown
          menu={{
            items
          }}
          trigger={['click']}
          onClick={() => setSelectedClass(record.id)}
        >
          <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
            <BsThreeDots />
          </a>
        </Dropdown>
      )
    }
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
        <Search
          style={{ width: '300px' }}
          placeholder="Search by class name"
          enterButton="Search"
          size="middle"
          onChange={e => setSearchName(e.target.value)}
          onSearch={() => getClasses(true)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(`create-class`)}
        >
          New Class
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{
        current: currentPage,
        total: lastPage * 10,
        onChange: handlePageChange,
        showSizeChanger: false
      }}/>
    </>
  )
}
export default OnlineCourseManageContent;