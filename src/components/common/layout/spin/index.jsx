import { Spin as AntdSpin } from 'antd';

const Spin = () => {
    return (
        <div
            style={{
                zIndex: '9',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.05)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <AntdSpin size="large" />
        </div>
    );
};

export default Spin;