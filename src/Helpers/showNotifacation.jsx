import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useEffect } from 'react';


export const openNotification = ({ type, message, description, duration = 4.5, placement = 'topRight' }) => {
    const config = {
        message,
        description,
        placement,
        duration,
        style: {
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
    };

    switch (type) {
        case 'success':
            notification.success({
                ...config,
                icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
            });
            break;
        case 'error':
            notification.error({
                ...config,
                icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
            });
            break;
        case 'info':
            notification.info({
                ...config,
                icon: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
            });
            break;
        case 'warning':
            notification.warning({
                ...config,
                icon: <WarningOutlined style={{ color: '#faad14' }} />,
            });
            break;
        default:
            notification.open(config);
            break;
    }
};

const ShowNotification = ({ type, message, description, duration, placement }) => {
    useEffect(() => {
        openNotification({ type, message, description, duration, placement });
    }, [type, message, description, duration, placement]);

    return null;
};

export default ShowNotification;