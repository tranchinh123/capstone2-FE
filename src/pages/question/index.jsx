import { useState, useEffect } from 'react';
import { Table, Dropdown, Button, Input, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

import { BsThreeDots } from 'react-icons/bs';
const { Search } = Input;

const QuestionPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [searchName, setSearchName] = useState(null);

    const navigate = useNavigate();
    const { api } = useAxios();

  const handleDeleteQuestion = async () => {
    try {
      window.showLoading(true);
      await api.get(`/admin/question/destroy/${selectedQuestionId}`);
      window.showLoading(false);
      window.openNoti('Message', 'Delete question successfully.');
      handleGetQuestions(true);
    } catch (error) {
      window.showLoading(false);
      window.openNoti('Message', 'Failed to delete question.');
    }
  }

    const items = [
        {
            label: (
                <a type="button" onClick={() => navigate(`/question/edit/${selectedQuestionId}`)}>
                    Edit
                </a>
            ),
            key: '0'
        },
        {
            label: (
                <Popconfirm
                    title="Delete the question"
                    description="Are you sure to delete this question?"
                    onConfirm={handleDeleteQuestion}
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
            title: 'Question name',
            dataIndex: 'question_name',
            key: 'question_name'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (_, record) => {
                return <span>{record.question_type === 0 ? 'Mutiple choices' : 'Essay'}</span>
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
                return <span>{new Date(record.updated_at).toLocaleString()}</span>
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
                    onClick={() => setSelectedQuestionId(record.id)}
                >
                    <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
                        <BsThreeDots />
                    </a>
                </Dropdown>
            )
        }
    ];

    const handleSearch = () => {
        handleGetQuestions(true);
    }

    const handlePageChange = (value) => {
        setCurrentPage(value);
      }
    
    const handleGetQuestions = async (getFirstPage) => {
        window.showLoading(true);
        try {
            const { data } = await api.post(`/admin/question/get-data?page=${getFirstPage ? '1' : currentPage}`, {
                question_name: searchName
            });
            setCurrentPage(data.questions.current_page);
            setLastPage(data.questions.last_page);
            setQuestions(data.questions.data);
            window.showLoading(false);
        } catch (error) {
          if(error.response.data.error === 'There are no questions in the system') {
            setCurrentPage(1);
            setLastPage(1);
            setQuestions([]);
          } 
          console.log(error);
          window.showLoading(false);
        }
    }
    
    useEffect(() => {
        handleGetQuestions();
    }, [currentPage]);

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
                    placeholder="Search by name"
                    enterButton="Search"
                    size="middle"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    onSearch={handleSearch}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/question/create')}
                >
                    New question
                </Button>
            </div>
            <Table columns={columns} dataSource={questions} pagination={{
                current: currentPage,
                total: lastPage * 10,
                onChange: handlePageChange,
                showSizeChanger: false
            }}/>
        </>
    );
};

export default QuestionPage;