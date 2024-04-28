import { useState } from 'react';
import { Table, Tag, Dropdown, Button, Popconfirm, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BsThreeDots } from 'react-icons/bs';
import { useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import CreateUserModal from './create-user';
import { useAppContext } from '../../contexts/MainContext';
import NotAllow from '../../components/common/not-allow';
const { Search } = Input;

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState(null);
  const [searchStatus, setSearchStatus] = useState(null);
  const { api } = useAxios();
  const { user: appUser } = useAppContext();

  const confirm = () => {
    deleteUser();
  };

  const getUsers = async (page) => {
    window.showLoading(true);
    try {
      const { data } = await api.post(`/admin/user/get-data?page=${page}`, {
        email: searchEmail,
        is_block: searchStatus
      });
      const editedData = data.users.data.map(d => {
        return {...d, key: d.id};
      });
      setCurrentPage(data.users.current_page);
      setLastPage(data.users.last_page);
      setUsers(editedData);
      window.showLoading(false);
    } catch (error) {
      window.showLoading(false);
      if(error.response.data.error === 'There are no accounts in the system!') {
        setUsers([]);
        setCurrentPage(1);
        setLastPage(1);
      }
    }
  }

  const deleteUser = async () => {
    try {
      await api.get(`/admin/user/destroy/${selectedUser}`);
      getUsers(1);
      window.openNoti('Message', 'Delete user succesfully.')
    } catch (error) {
      window.openNoti('Message', 'Failed to delete user.')
    }
  }

  const updateUserStatus = async () => {
    try {
      await api.get(`/admin/user/update-status/${selectedUser}`);
      getUsers(currentPage);
      window.openNoti('Message', 'Update status of user succesfully.')
    } catch (error) {
      window.openNoti('Message', 'Failed to update status of user.')
    }
  }

  const handlePageChange = (value) => {
    setCurrentPage(value);
  }

  const items = [
    {
      label: (
        <a
          type="button"
          onClick={updateUserStatus}
        >
          Switch status
        </a>
      ),
      key: '0'
    },
    {
      label: (
        <Popconfirm
          title="Delete the user"
          description="Are you sure to delete this user?"
          onConfirm={confirm}
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
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: 'Status',
      key: 'is_block',
      dataIndex: 'is_block',
      ellipsis: {
        showTitle: true,
      },
      render: (_, { is_block }) => {
        const color = is_block === 1 ? 'cyan' : 'green';
        const text = is_block === 1 ? 'INACTIVE' : 'ACTIVE'
          return (
            <Tag color={color}>
              {text.toUpperCase()}
            </Tag>
          )
      }
    },
    {
      title: 'Created At',
      key: 'created_at',
      dataIndex: 'created_at',
      ellipsis: {
        showTitle: true,
      },
      render: (_, { created_at }) => {
        const date = new Date(created_at);
        const humanReadableDate = date.toLocaleString();
        return (
          <span>{humanReadableDate}</span>
        )
      }
    },
    {
      title: 'Updated At',
      key: 'updated_at',
      dataIndex: 'updated_at',
      ellipsis: {
        showTitle: true,
      },
      render: (_, { updated_at }) => {
        const date = new Date(updated_at);
        const humanReadableDate = date.toLocaleString();
        return (
          <span>{humanReadableDate}</span>
        )
      }
    },
    {
      title: '',
      key: 'action',
      // render: (_, record) => (
      render: (_, { id }) => (
        <Dropdown
          menu={{
            items
          }}
          trigger={['click']}
        >
          <a style={{ color: 'black' }} onClick={(e) => {
            e.preventDefault()
            setSelectedUser(id);
          }}>
            <BsThreeDots />
          </a>
        </Dropdown>
      )
    }
  ];

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getUsers(1);
  }, [searchStatus])

  return (
    <>
      {
        appUser.role === 0 ? <NotAllow /> : (
          <>
          {isOpen && <CreateUserModal isModalOpen={isOpen} setIsModalOpen={setIsOpen} getUsers={() => getUsers(1)} />}
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
                    onChange={e => setSearchEmail(e.target.value)}
                    onSearch={() => getUsers(1)}
                  />
                  <Select
                    placeholder={'Status'}
                    style={{
                      width: 120,
                    }}
                    onChange={value => setSearchStatus(value)}
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
                  />
                </div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsOpen(true)}
                >
                  New user
                </Button>
            </div>
            <Table columns={columns} dataSource={users} 
                pagination={{
                  current: currentPage,
                  total: lastPage * 10,
                  onChange: handlePageChange,
                  showSizeChanger: false
            }}/>
          </>
        )
      }
    </>
  )
}

export default ManageUsersPage