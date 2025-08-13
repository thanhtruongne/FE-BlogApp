import { CommentOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CommentBlog from "./components/CommentBlog";
import FormBlogPage from "./components/Form.page";
const useTabFromHash = (hashToTabMap, defaultTab) => {
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(hashToTabMap[hash] || defaultTab);
  }, [hash, hashToTabMap, defaultTab]);

  return [activeTab, setActiveTab];
};

const TabNavPost = (props) => {
  const { id } = useParams();
  const [dataComment, setDataComment] = useState(null);
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('viewForm');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get('view');
    if (view) {
      setActiveTab(view)
    }

  }, [location.hash])
  const items = useMemo(
    () => [
      {
        key: 'viewForm',
        label: id ? "Chỉnh sửa bài viết" : "Tạo bài viết",
        children: <FormBlogPage setDataComment={setDataComment} />,
        icon: <FileDoneOutlined />,
      },
      {
        key: 'viewComment',
        label: "Quản lý ý kiến",
        children: <CommentBlog dataComment={dataComment} setDataComment={setDataComment} {...props} />,
        icon: <CommentOutlined />,
      },
    ],
    [id, dataComment]
  );

  return (
    <div className="bg-white w-full h-full">
      <Tabs activeKey={activeTab} onChange={setActiveTab} centered items={items} />
    </div>
  );
};

export default TabNavPost;