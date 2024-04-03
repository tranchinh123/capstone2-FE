import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routers } from './routers';
import AppLayout from './components/common/layout';

import MainContextProvider from './contexts/MainContext';
import NotFoundPage from './pages/404';

const Components = {};

routers.forEach((route) => {
  Components[route.component] = lazy(() =>
    import(`./pages/${route.component}`)
  );
});

const App = () => {
  return (
    <MainContextProvider>
      <Router>
        <Routes>
          {routers.map((router, index) => {
            const Component = Components[router.component];
            return (
              <Route
                key={index}
                {...router}
                element={
                  <AppLayout allow={router.allow}>
                    <Component />
                  </AppLayout>
                }
              />
            );
          })}
          <Route
            path="*"
            element={
              <AppLayout>
                <NotFoundPage />
              </AppLayout>
            }
          />
        </Routes>
      </Router>
    </MainContextProvider>
  );
};

export default App;
