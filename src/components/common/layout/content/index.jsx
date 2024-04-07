import { Layout, theme } from 'antd';
const { Content } = Layout;

const AppContent = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    return (
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
    );
};

export default AppContent;