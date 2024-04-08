import { Suspense } from 'react';
import { LoadingLazyComponent } from '../loading-lazy-page';
import { Layout } from 'antd';

import AppHeader from './header';
import AppContent from './content';
import AppSider from './sider';

const AppLayout = ({ children, allow, ...others }) => {
  console.log(others.noLayout);
  return (
    <>
      {others.noLayout ? (
        children
      ) : (
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
      )}
    </>
  );
};

export default AppLayout;