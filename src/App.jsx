import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import UserLayouts from './layouts/UserLayouts';
import UserRoute from './Routes/Route/UserRoute';
import GeneralPaths from "./Routes/RoutePaths/GeneralPaths";

import { WebSocketProvider } from './contexts/useWebSocketsContexts';
import AdminLayouts from './layouts/admins/AdminLayouts';
import Error404 from "./Pages/404";
import AuthLoginSystem from './Pages/Admin/Auth';
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from './Routes/Route/AdminRoute';
import AdminPaths from './Routes/RoutePaths/AdminPaths';

function App() {
  const router = createBrowserRouter([
    {
      path : AdminPaths.LOGIN,
      element: <AuthLoginSystem />,
    },
    {
      element : 
        ( <PrivateRoute>
            <AdminLayouts/>
         </PrivateRoute>
         )
       ,
      children : AdminRoute
    },
    {
     element :   <UserLayouts />,
      children : UserRoute 
    },
    {
      path:'/',
      element: <Navigate to={GeneralPaths.HOMEPAGE} replace/>,
    },
    // 404
    {
      path :  GeneralPaths.NOTFOUND,
      element : <Error404 />
    },
  ])


  
  return (
    <WebSocketProvider>
        <RouterProvider router={router}/>
    </WebSocketProvider>
  );
}

export default App
