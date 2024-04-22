import { Suspense } from 'react';
import { LoadingLazyComponent } from '../loading-lazy-page';
import { Layout } from 'antd';

import AppHeader from './header';
import AppContent from './content';
import AppSider from './sider';
import { useAppContext } from '../../../contexts/MainContext';
import { Navigate } from 'react-router-dom';

const AppLayout = ({ children, allow, ...others }) => {
  const { user } = useAppContext();
  return (
    <>
      {others.noLayout ? (
        children
      ) : (
        <>
          { user ? (
            <Suspense fallback={<LoadingLazyComponent />}>
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
            </Suspense>
          ) : (
            <Navigate />
          )}
        </>
      )}
    </>
  );
};

export default AppLayout;