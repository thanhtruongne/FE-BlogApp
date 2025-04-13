import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import useAuth from '../../../hook/useAuth';
import './styles/TabDataUserInfo.css';
import SavedPost from './tabs/SavedPost';
import UserInfoTab from './tabs/UserInfoTab';

const TabDataUserInfo = (props) => {
    const  { type , handleLogOutForm} = props
    const {currentUser , isAuthenticated} = useAuth()

    const dispatch = useDispatch()
    const items = [
        {
          key: 'general',
          label: 'Thông tin chung',
          children: <UserInfoTab user={currentUser}  dispatch={dispatch} />,
        },
        {
          key: 'comments',
          label: (
            <span>
              Ý kiến của bạn <span className="text-gray-400">(0)</span>
            </span>
          ),
          children: <div className="p-4">Chưa có ý kiến nào</div>,
        },
        {
          key: 'saved',
          label: 'Tin đã lưu',
          children: <SavedPost />,
        },
        {
          key: 'viewed',
          label: 'Tin đã xem',
          children: <div className="p-4">Chưa có tin đã xem</div>,
        },
        {
          key: 'logout',
          label: (
            <span className="text-gray-600 cursor-pointer" onClick={handleLogOutForm}>
              <LogoutOutlined className="mr-2" />
              Thoát
            </span>
          ),
          children: <div className="p-4">Đang đăng xuất...</div>,
        },
    ];
    
    return (
      <div className="w-full mt-[20px] container">
            <div className="profile-tabs-container">

      .       <div className="user-profile-header w-[250px] mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-violet-500 text-white flex items-center justify-center text-lg font-medium">
                        {currentUser?.imageURL ? (
                            <img src={currentUser?.imageURL} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <span>{currentUser?.full_name?.charAt(0) || <UserOutlined />}</span>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 mb-2">
                            {currentUser?.full_name}
                        </div>
                        <div className="text-xs text-gray-500">
                            Tham gia từ {currentUser?.formatCreatedAt}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="custom-tabs">
                <Tabs
                    tabPosition="left"
                    defaultActiveKey={type}
                    items={items}
                    className="bg-white rounded-lg w-full"
                />
            </div>
        </div>

      </div>
    );
}

export default TabDataUserInfo;
