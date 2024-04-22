import { Layout, theme, Avatar, Dropdown } from "antd";
import { useAppContext } from "../../../../contexts/MainContext";
import { forgetCookie } from "../../../../configs/cookie";
const { Header } = Layout;

const AppHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user, setUser } = useAppContext();

  const logout = () => {
    forgetCookie("access_token");
    setUser(null);
    window.location.reload();
  };

  const items = [
    {
      label: <span onClick={logout}>Log out</span>,
      key: "0",
    },
  ];

  return (
    <Header
      style={{
        padding: "0 50px",
        background: colorBgContainer,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <Avatar
          style={{
            backgroundColor: "#838F99",
            verticalAlign: "middle",
            cursor: "pointer",
          }}
          size="large"
        >
          {user?.name?.slice(0, 1)?.toUpperCase()}
        </Avatar>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
