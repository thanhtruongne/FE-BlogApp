import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import GeneralPaths from '../../Routes/RoutePaths/GeneralPaths';

const TabUserProvide = ({user}) => {
    const nameExtract = user?.full_name ? user?.full_name : user?.email;
    const items = [
        {
          label: (
            <div className="px-[15px]">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium bg-[#E5E5E5] text-[#9F9F9F]">{nameExtract?.charAt(0)}</span>
                <span className="name_sub">{nameExtract}</span>
            </div>
          ),
          key: '0',
          disabled : true,
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Link 
                to={GeneralPaths.INFO_USER_DETAIL}
                className="text-[15px] block text-[#4F4F4F] px-[16px] relative w-full"
                rel="noopener noreferrer">
                Thông tin chung
                </Link>
            ),
            key: '1',
        },
        {
            label: (
                <Link 
                to={GeneralPaths.POST_SAVED}
                className="text-[15px] block text-[#4F4F4F] px-[16px] relative w-full"
                rel="noopener noreferrer">
                    Tin đã lưu
                </Link>
            ),
            key: '2',
        },
        {
            label: (
                <Link 
                to={GeneralPaths.POST_VIEWED}
                className="text-[15px] block text-[#4F4F4F] px-[16px] relative w-full"
                rel="noopener noreferrer">
                  Tin đã xem
                </Link>
            ),
            key: '3',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Link 
                to='#'
                className="text-[15px] block text-[#4F4F4F] px-[15px] relative w-full"
                 >
                  Thoát  <LogoutOutlined className="ml-2" />
                </Link>
            ),
            key: '4',
        },
    ];

    return (
        <Dropdown 
            menu={{ items }} 
            trigger={['click']}
            className='px-5'
        >
            <div className="flex items-center cursor-pointer">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium bg-[#E5E5E5] text-[#9F9F9F]">
                    {nameExtract?.charAt(0)?.toUpperCase()}
                </div>
                <DownOutlined style={{ width : '8px' }} className="ml-1" />
            </div>
        </Dropdown>
    )
}   

export default TabUserProvide;

