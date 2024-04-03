import { Spin } from 'antd';
import { useEffect, useState, createContext, useContext } from 'react';
import LoginModal from '../components/common/modal/LoginModal';

export const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <MainContext.Provider
      value={{
        showModal
      }}
    >
      {isLoading ? (
        <div
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spin />
        </div>
      ) : (
        <div style={{ maxWidth: '2000px', margin: '0 auto' }}>
          <LoginModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          {children}
        </div>
      )}
    </MainContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(MainContext);
export default MainContextProvider;
