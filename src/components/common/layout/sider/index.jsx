import { Layout, Menu } from 'antd';
const { Sider } = Layout;

import { FaList, FaRegFileExcel } from 'react-icons/fa';

const AppSider = () => {
    return (
        <Sider collapsed={true}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/course']}
                items={[
                    {
                        key: '/course',
                        icon: <FaList />,
                        label: 'Courses'
                    },
                    {
                        key: '/analytics',
                        icon: <FaRegFileExcel />,
                        label: 'Analytics'
                    }
                ]}
            />
        </Sider>
    );
};

export default AppSider;