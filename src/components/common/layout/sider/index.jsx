import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;

import { FaList, FaRegFileExcel, FaCalendarAlt, FaUser  } from 'react-icons/fa';

const AppSider = () => {
    const navigate = useNavigate();

    return (
        <Sider collapsed={true}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/course']}
                items={[
                    {
                        key: '/courses',
                        icon: <FaList />,
                        label: 'Courses',
                        onClick: () => navigate('/courses')
                    },
                    {
                        key: '/materials',
                        icon: <FaRegFileExcel />,
                        label: 'Materials',
                        children: [
                            {
                                key: '/materials/excercise',
                                label: 'Manage excercises',
                                onClick: () => navigate('/excercise')
                            },
                            {
                                key: '/materials/question',
                                label: 'Manange questions',
                                onClick: () => navigate('/question')
                            }
                        ]
                    },
                    {
                      key: '/schedule',
                      icon: <FaCalendarAlt />,
                      label: 'Schedule',
                      onClick: () => navigate('/schedule')
                    },
                    {
                      key: '/users',
                      icon: <FaUser />,
                      label: 'Manage users',
                      onClick: () => navigate('/users')
                    }
                ]}
            />
        </Sider>
    );
};

export default AppSider;