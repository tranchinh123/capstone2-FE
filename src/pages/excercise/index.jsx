import { useState } from 'react';
import { Table, Tag, Dropdown, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CreateExcerciseModal from '../../components/common/modal/CreaseExcerciseModal';

import { BsThreeDots } from 'react-icons/bs';

const AssignmentPage = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const items = [
        {
            label: (
                <a
                    type="button"
                    onClick={() => navigate('/course-manage-description/1')}
                >
                    Edit
                </a>
            ),
            key: '0'
        },
        {
            label: (
                <a type="button" onClick={() => navigate('/course-manage-content/1')}>
                    Delete
                </a>
            ),
            key: '1'
        }
    ];

    const columns = [
        {
            title: 'Question content',
            dataIndex: 'content',
            key: 'content'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: 'Mark',
            dataIndex: 'mark',
            key: 'mark'
        },
        {
            title: 'Difficulty',
            dataIndex: 'difficulty',
            key: 'difficulty'
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => (
                <>
                    {status.map((t) => {
                        let color = t.length > 5 ? 'geekblue' : 'green';
                        if (t === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={t}>
                                {t.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            )
        },
        {
            title: '',
            key: 'action',
            // render: (_, record) => (
            render: () => (
                <Dropdown
                    menu={{
                        items
                    }}
                    trigger={['click']}
                >
                    <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
                        <BsThreeDots />
                    </a>
                </Dropdown>
            )
        }
    ];

    const data = [
        {
            key: '1',
            content: 'John Brown',
            type: '$32',
            mark: 'New York No. 1 Lake Park',
            difficulty: '',
            status: ['cool', 'teacher']
        },
        {
            key: '2',
            title: 'Jim Green',
            price: '$42',
            address: 'London No. 1 Lake Park',
            status: ['loser']
        },
        {
            key: '3',
            title: 'Joe Black',
            price: '$32',
            address: 'Sydney No. 1 Lake Park',
            status: ['cool', 'teacher']
        }
    ];

    return (
        <>
            <CreateExcerciseModal isModalOpen={open} setIsModalOpen={setOpen} />
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
                    onClick={() => setOpen(true)}
                >
                    New Excerise
                </Button>
            </div>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default AssignmentPage;