import { useState } from 'react';
import { Table, Tag, Dropdown, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { BsThreeDots } from 'react-icons/bs';

const QuestionPage = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: (
                <a type="button" onClick={() => navigate('/excercise/edit')}>
                    Edit
                </a>
            ),
            key: '0'
        },
        {
            label: (
                <a type="button" onClick={() => { }}>
                    Delete
                </a>
            ),
            key: '1'
        }
    ];

    const columns = [
        {
            title: 'Question name',
            dataIndex: 'name',
            key: 'name'
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
            name: 'React basic',
            type: 'Multiple choice',
            mark: '4',
            difficulty: 'Hard',
            status: ['active']
        }
    ];

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
                    onClick={() => navigate('/question/create')}
                >
                    New question
                </Button>
            </div>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default QuestionPage;