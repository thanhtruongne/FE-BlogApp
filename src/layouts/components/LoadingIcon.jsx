import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';


const LoadingIcon = ({size = 'large', fontSize = 32}) => {
    const antIcon = <LoadingOutlined style={{ fontSize }} spin />;

    return (
        <div className="flex justify-center items-center">
            <Spin indicator={antIcon} fullscreen size={size} />
        </div>
      );
}

export default LoadingIcon