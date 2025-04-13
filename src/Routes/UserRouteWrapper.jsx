import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import { logout } from '../slices/auth';
import { clearClientID, clearTokens } from '../utils/cookies';

const UserRouteWrapper = ({children}) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const {accessToken , clientId } = useAuth();
  if ( !accessToken || !clientId) {
    dispatch(logout())
    clearTokens()
    clearClientID();
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children
};

export default UserRouteWrapper; 