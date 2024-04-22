import { Table, Tag, Dropdown, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';

const AdminCoursePage = () => {
    const navigate = useNavigate();
  
    const items = [
        {
          label: (
            <a
              type="button"
              onClick={() => navigate('/course-manage-description/1')}
            >
              Manage course description
            </a>
          ),
          key: '0'
        },
        {
          label: (
            <a type="button" onClick={() => navigate('/course-manage-content/1')}>
              Manage course content
            </a>
          ),
          key: '1'
        }
      ];
      
      const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
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
      key: 'type',
      dataIndex: 'type',
      render: (_, { type }) => (
        <>
          {type.map((t) => {
            return <span key={t}>{t.toUpperCase()}</span>;
          })}
        </>
      )
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status.map((t) => {
            let color = t.length > 7 ? 'cyan' : 'green';
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
      title: 'John Brown',
      description:
        'The licensing of count nouns as arguments can be implemented by articles, by the plural, by demonstratives, by quantifiers.',
      instructor: 'Rajeev Suresh',
      address: 'New York No. 1 Lake Park',
      type: ['offline'],
      status: ['public']
    },
    {
      key: '2',
      title: 'Jim Green',
      description:
        'The licensing of count nouns as arguments can be implemented by articles, by the plural, by demonstratives, by quantifiers.',
      instructor: 'Rajeev Suresh',
      address: 'London No. 1 Lake Park',
      type: ['online'],
      status: ['unpublic']
    },
    {
      key: '3',
      title: 'Joe Black',
      description:
        'The licensing of count nouns as arguments can be implemented by articles, by the plural, by demonstratives, by quantifiers.',
      instructor: 'Rajeev Suresh',
      address: 'Sydney No. 1 Lake Park',
      type: ['offline'],
      status: ['public']
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
          onClick={() => navigate('/course-create')}
        >
          New Course
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default AdminCoursePage;