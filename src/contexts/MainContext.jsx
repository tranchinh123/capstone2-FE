import { useEffect, useState, createContext, useContext } from 'react';
import { notification } from 'antd';
import Spin from '../components/common/spin';
// import { ROLES } from '../constants/roles';
import useAxios from '../hooks/useAxios';

export const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const { api: axiosApi }  = useAxios();

  window.openNoti = (message, description) => {
    api.info({
      message,
      description,
      placement: 'topRight',
    });
  };


  const getUser = async () => {
    try {
      const { data } = await axiosApi.get("/me");
      setUser({
        email: data.user.email,
        name: data.user.full_name,
        phone: data.user.phone,
        role: data.user.id_role,
        address: data.user.address
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  window.showLoading = (status) => {
    setIsSpinning(status);
  };

  return (
    <MainContext.Provider
      value={{
        user,
        setUser
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
          {isSpinning && <Spin />}
          {contextHolder}
          {children}
        </div>
      )}
    </MainContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(MainContext);
export default MainContextProvider;