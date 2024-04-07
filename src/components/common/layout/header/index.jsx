import { Layout, theme } from 'antd';
const { Header } = Layout;

const AppHeader = () => {
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer
            }}
        ></Header>
    );
};

export default AppHeader;