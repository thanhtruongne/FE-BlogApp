import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import { logout } from '../slices/auth';
import { clearClientID, clearTokens } from '../utils/cookies';
import GeneralPaths from './RoutePaths/GeneralPaths';

const UserRouteWrapper = ({children}) => {
  const dispatch = useDispatch()


  const { isAuthenticated, accessToken , clientId , currentUser } = useAuth();
  if (!isAuthenticated ||  !accessToken || !clientId || !currentUser) {
    dispatch(logout())
    clearTokens()
    clearClientID();
    return <Navigate to={GeneralPaths.NOTFOUND} replace />;
  }
  return children
};

export default UserRouteWrapper;