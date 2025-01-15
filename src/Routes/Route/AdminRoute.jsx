import React from "react";
import AdminPaths from "../RoutePaths/AdminPaths";
import Dashboard from "../../Pages/Admin/Dashboard";
import {
    MdHome,
    MdOutlineShoppingCart,
    MdBarChart,
    MdPerson,
    MdLock,
  } from "react-icons/md";
import UserPages from "../../Pages/Admin/User.pages";

const AdminRoute = [
    { path: AdminPaths.DASHBOARD, element: <Dashboard /> ,icon :  <MdHome className="h-6 w-6" />,name : 'Thống kê' },
    { path: AdminPaths.MANAGER_USER, element: <UserPages /> ,icon :  <MdPerson className="h-6 w-6" />,name : 'Quản lý người dùng' },
]

export default AdminRoute