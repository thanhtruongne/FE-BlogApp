import { CommentOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Tabs } from 'antd';
import React from 'react';
import AuthorPage from "./author.page";
import RoleAuthorPage from "./role.page";

const TabNavAuthor = () => {
    const items = [
        { key: "1", label: "Danh sách tác giả", children: <AuthorPage /> ,Icon : <FileDoneOutlined />},
        { key: "2", label: "Quản lý vai trò", children: <RoleAuthorPage/> ,Icon : <CommentOutlined />},
    ];

    return (
        <div className="bg-white w-full h-full">
            <Tabs defaultActiveKey="1"  centered items={items} />
        </div>
    )

};
export default TabNavAuthor;  