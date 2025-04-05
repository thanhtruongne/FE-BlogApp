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

  // Check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
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

      // Validate token format and expiration
      if (!isValidToken(accessToken) || isTokenExpired(accessToken)) {
        throw new Error('Invalid or expired token');
      }

      // Validate clientId
      if (!isValidClientId(clientId)) {
        throw new Error('Invalid client ID');
      }

      // If we don't have user data, fetch it
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
