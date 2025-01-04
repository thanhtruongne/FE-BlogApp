import { useState } from 'react'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Navigate to={StudentPaths.DASHBOARD}/>
    }
  ])
  return <RouterProvider router={router}/>;
}

export default App
