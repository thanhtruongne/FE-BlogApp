import { useState } from 'react'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import UserPath from './Routes/RoutePaths/UserPath';
import HomePage from './Pages/HomePage';
import UserRoute from './Routes/Route/UserRoute';
import UserLayouts from './layouts/UserLayouts';
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Navigate to={UserPath.HOMEPAGE}/>
    },
    {
      element : <UserLayouts />,
      children : UserRoute 
    }
  ])


  
  return <RouterProvider router={router}/>;
}

export default App
