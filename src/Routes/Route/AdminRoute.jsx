import React from "react";
import {
  MdHome,
  MdManageAccounts,
  MdOutlineFolderCopy,
  MdOutlinePostAdd,
  MdOutlineSettings,
  MdPerson
} from "react-icons/md";
import TabNavAuthor from "../../Pages/Admin/Authors/tabnav.page";
import BlogPage from "../../Pages/Admin/Blog/Blog.page";
import TabNavPost from "../../Pages/Admin/Blog/Switch.page";
import CategoriesPages from "../../Pages/Admin/Categories.pages";
import Dashboard from "../../Pages/Admin/Dashboard";
import SettingPages from "../../Pages/Admin/Setting";
import UserPages from "../../Pages/Admin/User.pages";
import AdminPaths from "../RoutePaths/AdminPaths";

const AdminRoute = [
    { path: AdminPaths.DASHBOARD, element: <Dashboard /> ,icon :  <MdHome className="h-6 w-6" />,name : 'Thống kê' },
    { path: AdminPaths.MANAGER_USER, element: <UserPages /> ,icon :  <MdPerson className="h-6 w-6" />,name : 'Quản lý người dùng' },
    { path: AdminPaths.MANAGER_CATEGORIES, element: <CategoriesPages /> ,icon :  <MdOutlineFolderCopy className="h-6 w-6" />, name : 'Quản lý danh mục' },
    { path: AdminPaths.MANAGER_POST, element: <BlogPage /> ,icon :  <MdOutlinePostAdd  className="h-6 w-6" />,name : 'Quản lý bài viết' },
    { path: AdminPaths.MANAGER_POST_FORM, element: <TabNavPost /> ,icon :  <MdOutlinePostAdd  className="h-6 w-6" />,name : 'Bài viết', key : true},
    { path: AdminPaths.MANAGER_POST_FORM_DETAIL, element: <TabNavPost /> ,icon :  <MdOutlinePostAdd  className="h-6 w-6" />,name : 'Chỉnh sửa bài viết', key : true},
    { path: AdminPaths.MANAGER_AUTHOR_DETAIL, element: <TabNavAuthor /> ,icon :  <MdManageAccounts   className="h-6 w-6" />,name : 'Quản lý tác giả'},
    { path: AdminPaths.MANAGER_SETTING, element: <SettingPages />  ,icon :  <MdOutlineSettings    className="h-6 w-6" />, name : 'Cài đặt'},
]

export default AdminRoute