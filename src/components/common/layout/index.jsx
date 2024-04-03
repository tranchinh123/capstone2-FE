import { Suspense } from 'react';
import { LoadingLazyComponent } from '../loading-page';

import { FaList, FaRegFileExcel } from 'react-icons/fa';
import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const AppLayout = ({ children, allow }) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  console.log(allow);
  return (
    <Suspense fallback={<LoadingLazyComponent />}>
      <Layout
        style={{
          minHeight: '100vh'
        }}
      >
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
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer
            }}
          ></Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Suspense>
  );
};

export default AppLayout;
