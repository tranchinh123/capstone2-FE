import { useState, useEffect } from 'react';
import { Table, Popconfirm, Dropdown, Button, Input, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CreateExcerciseModal from '../../components/common/modal/CreaseExcerciseModal';
import useAxios from '../../hooks/useAxios';
const { Search } = Input;

import { BsThreeDots } from 'react-icons/bs';

const AssignmentPage = () => {
  const [open, setOpen] = useState(false);
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [selectedExcerciseId, setSelectedExerciseId] = useState(null);
  const [selectedExcerciseInfo, setSelectedExcerciseInfo] = useState(null);
  const [excercises, setExcercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchName, setSearchName] = useState(null);
  const navigate = useNavigate();
  const { api } = useAxios();

  const handleDeleteExcercise = async () => {
    try {
      window.showLoading(true);
      const { data } = await api.get(`/admin/excercise/destroy/${selectedExcerciseId}`);
      console.log(data, 'data');
      window.showLoading(false);
      window.openNoti('Message', 'Delete excercise successfully');
      getExcercises(true);
    } catch (error) {
      console.log(error);
      window.showLoading(false);
      window.openNoti('Message', 'Failed to delete excercise');
    }
  }

  const items = [
    {
      label: (
        <a
          type="button"
          onClick={() => handleGetInfoToEdit()}
        >
          Edit
        </a>
      ),
      key: '0'
    },
    {
      label: (
        <Popconfirm
          title="Delete the excercise"
          description="Are you sure to delete this excercise?"
          onConfirm={handleDeleteExcercise}
          okText="Yes"
          cancelText="No"
      >
        <a type="button">
          Delete
        </a>
      </Popconfirm>
      ),
      key: '1'
    }
  ];

  const columns = [
    {
      title: 'Excercise name',
      dataIndex: 'excercise_name',
      key: 'excercise_name'
    },
    {
      title: 'Number of question',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record) => {
        return <span>{JSON.parse(record.excercise_content).length}</span>
      }
    },
    {
      title: 'Mark',
      dataIndex: 'mark',
      key: 'mark',
      render: (_, record) => {
        return <span>{JSON.parse(record.excercise_content).map(v => +v.mark).reduce((acc, cur) => acc + cur, 0)}</span>
      }
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      ellipsis: {
        showTitle: true,
      },
      render: (_, { excercise_type }) => {
        const color = excercise_type === 0 ? 'green' : 'cyan';
        const text = excercise_type === 0 ? 'Online' : 'Offline'
          return (
            <Tag color={color}>
              {text.toUpperCase()}
            </Tag>)
    }
  },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => {
        return <span>{new Date(record.created_at).toLocaleString()}</span>
      }
    },
    {
      title: 'Updated at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (_, record) => {
        return <span>{new Date(record.created_at).toLocaleString()}</span>
      }
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
          onClick={() => setSelectedExerciseId(record.id)}
        >
          <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
            <BsThreeDots />
          </a>
        </Dropdown>
      )
    }
  ];

  const getAllQuestions = async () => {
    try {
      const { data } = await api.get(`/admin/list-question`);
      console.log(data);
      setListOfQuestions(data.questions.map(d => {
        return { value: d.id, label: d.question_name, type: d.question_type }
      }))
    } catch (error) {
      console.log(error);
    }
  }

  const getExcercises = async (getFirstPage) => {
    try {
      window.showLoading(true);
      const { data } = await api.post(`/admin/excercise/get-data?page=${getFirstPage ? '1' : currentPage}`, {
        excercise_name: searchName
      });
      setCurrentPage(data.excercises.current_page);
      setLastPage(data.excercises.last_page);
      setExcercises(data.excercises.data);
      window.showLoading(false);
    } catch (error) {
      if(error.response.data.error === 'There are no excercises in the system') {
        setCurrentPage(1);
        setLastPage(1);
        setExcercises([]);
      } 
      window.showLoading(false);
      console.log(error);
    }
  }

  const handleGetInfoToEdit = async () => {
    try {
      window.showLoading(true);
      const { data } = await api.get(`/admin/excercise/get-data/${selectedExcerciseId}`)
      setSelectedExcerciseInfo(data.excercise);
      setOpen(true);
      window.showLoading(false);
    } catch (error) {
      window.showLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getAllQuestions();
  }, [])

  useEffect(() => {
    getExcercises();
  }, [currentPage])
  
  return (
    <>
     {open && <CreateExcerciseModal isModalOpen={open} setIsModalOpen={setOpen} listOfQuestions={listOfQuestions} getExcercises={getExcercises} selectedExcerciseInfo={selectedExcerciseInfo} />}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        <Search
          style={{ width: '300px' }}
          placeholder="Search by name"
          enterButton="Search"
          size="middle"
          onChange={e => setSearchName(e.target.value)}
          onSearch={() => getExcercises(true)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpen(true);
            setSelectedExerciseId(null);
            setSelectedExcerciseInfo(null);
          }}
        >
          New Excerise
        </Button>
      </div>
      <Table columns={columns} dataSource={excercises}       
          pagination={{
          current: currentPage,
          total: lastPage * 10,
          onChange: (value) => setCurrentPage(value),
          showSizeChanger: false
        }} 
      />
    </>
  );
};

export default AssignmentPage;
