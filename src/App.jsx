import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ModalLoginProvider } from "./contexts/ModalContext";
import { NotifyProvider } from "./contexts/NotifyContext";
import { SocketProvider } from "./contexts/SocketContext";
import AdminLayouts from './layouts/admins/AdminLayouts';
import UserLayouts from './layouts/UserLayouts';
import Error404 from "./Pages/404";
import AuthLoginSystem from './Pages/Admin/Auth';
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from './Routes/Route/AdminRoute';
import UserRoute from './Routes/Route/UserRoute';
import AdminPaths from './Routes/RoutePaths/AdminPaths';
import GeneralPaths from "./Routes/RoutePaths/GeneralPaths";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: AdminPaths.LOGIN,
      element: <AuthLoginSystem />,
    },
    {
      element:
        (
          <PrivateRoute>
            {/*  notify provider*/}
            <NotifyProvider>
              <AdminLayouts />
            </NotifyProvider>

          </PrivateRoute>
        )
      ,
      children: AdminRoute
    },
    {
      path: '/home',
      element: <Navigate to={GeneralPaths.HOMEPAGE} replace />,
    },
    {
      element: (
        <ModalLoginProvider>
          <UserLayouts />
        </ModalLoginProvider>
      ),
      children: UserRoute
    },
    // 404
    {
      path: GeneralPaths.NOTFOUND,
      element: <Error404 />
    },
  ])



  return (
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SocketProvider>
  );
}

export default App
