import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import GeneralPaths from "./Routes/RoutePaths/GeneralPaths";
import UserRoute from './Routes/Route/UserRoute';
import UserLayouts from './layouts/UserLayouts';

import AdminLayouts from './layouts/admins/AdminLayouts';
import AdminRoute from './Routes/Route/AdminRoute';
import AdminPaths from './Routes/RoutePaths/AdminPaths';
import AuthLoginSystem from './Pages/Admin/Auth';
import Error404 from "./Pages/404";
import AuthenticatedProvider from "./Context/AuthencatedContext";


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Navigate to={GeneralPaths.HOMEPAGE}/>
    },
    // 404
    {
      path :  GeneralPaths.NOTFOUND,
      element : <Error404 />
    },
    {
      element : <UserLayouts />,
      children : UserRoute 
    },
 
     //admin
    {
      path : AdminPaths.LOGIN,
      element: <AuthLoginSystem />,
    },
    {
      element: (
         <AuthenticatedProvider>
            <AdminLayouts/>
         </AuthenticatedProvider>
      ),
      children : AdminRoute
    }
  ])


  
  return <RouterProvider router={router}/>;
}

export default App
