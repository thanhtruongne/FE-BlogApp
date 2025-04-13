import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserCurrent, logout } from '../slices/auth';
import { clearClientID, clearTokens, getAccessToken, getClientID } from '../utils/cookies';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientId = getClientID();
  const accessToken = getAccessToken();
  
  // Get auth state from Redux
  const {  
    currentUser, 
    isAuthenticated,
    isAdmin
  } = useSelector((state) => state.auth);


  // Validate token format
  const isValidToken = (token) => {
    if (!token) return false;
    
    try {
      // Check if token is in valid JWT format
      const tokenParts = token.split('.');
      return tokenParts.length === 3;
    } catch (error) {
      return false;
    }
  };
  // Verify client ID
  const isValidClientId = (id) => {
    return typeof id === 'string' && id.length > 0;
  };

  // Main authentication check
  const checkAuth = async () => {
    try {
      // Check if we have both token and clientId
      if (!accessToken || !clientId) {
        throw new Error('Missing credentials');
      }

      if (!isValidToken(accessToken)) {
        throw new Error('Invalid token');
      }

      if (!isValidClientId(clientId)) {
        throw new Error('Invalid client ID');
      }
      if (!currentUser && accessToken) {
        await dispatch(getUserCurrent()).unwrap();
      }

      return true;

    } catch (error) {
      console.error('Auth check failed:', error);
      handleAuthError();
      return false;
    } finally {
    }
  };

  // Handle authentication errors
  const handleAuthError = () => {
    dispatch(logout());
    clearTokens();
    clearClientID();
    // navigate(GeneralPaths.LOGIN);
  };

  // Refresh user data periodically
  useEffect(() => {
    let refreshInterval;

    if (isAuthenticated && accessToken) {
      // Initial check
      checkAuth();

      // Set up periodic refresh (e.g., every 5 minutes)
      refreshInterval = setInterval(() => {
        checkAuth();
      }, 5 * 60 * 1000);
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isAuthenticated, accessToken]);


  const logoutUser = () => {
    handleAuthError();
  };

  return {
    isAuthenticated,
    currentUser,
    accessToken,
    clientId,
    logout: logoutUser,
    checkAuth,
    isAdmin
  };
};

export default useAuth;
