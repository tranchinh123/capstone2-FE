import { Layout } from 'antd';
import AppHeader from './header';
import AppContent from './content';
import AppSider from './sider';
import { useAppContext } from '../../../contexts/MainContext';
import { Navigate } from 'react-router-dom';

const AppLayout = ({ children }) => {
  const { user } = useAppContext();

  const handleRender = () => {
    return (
      <Layout
        style={{
          minHeight: '100vh'
        }}
      >
          <AppSider />
          <Layout>
            <AppHeader />
            <AppContent>{children}</AppContent>
          </Layout>
      </Layout>
    )
  }

  return (
    <>
      {user ? handleRender() : <Navigate to='/login' />}
    </>
  );
};

export default AppLayout;