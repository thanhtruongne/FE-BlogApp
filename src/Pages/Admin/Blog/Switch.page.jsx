import { CommentOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Tabs } from 'antd';
import React from 'react';
import { useParams } from "react-router-dom";
import FormBlogPage from "./components/Form.page";

const TabNavPost = () => {
    const {id} = useParams();
    const items = [
        { key: "1", label: id ? "Chỉnh sửa bài viết" :  "Tạo bài viết", children: <FormBlogPage /> ,Icon : <FileDoneOutlined />},
        { key: "2", label: "Quản lý ý kiến", children: 'asdasd' ,Icon : <CommentOutlined />},
    ];

    return (
        <div className="bg-white w-full h-full">
            <Tabs defaultActiveKey="1"  centered items={items} />
        </div>
    )

};
export default TabNavPost;  