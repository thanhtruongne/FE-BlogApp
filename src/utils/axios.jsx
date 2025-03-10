import axios from 'axios';
import AuthencationApi from '../apis/Authencation.api';
import { store } from '../slices';
import { logout } from '../slices/auth';
import { clearClientID, clearTokens, getAccessToken, getClientID, setTokens } from './cookies';




const instance = axios.create({
    baseURL: import.meta.env.REACT_APP_SERVER,
    withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = token;
    }
    const clientID = getClientID();
    if(clientID) {
      config.headers['X-Client-ID'] = clientID;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let countRetry = 0

instance.interceptors.response.use(
    (response) => response.data,
    async(error) => {
       const requestConfig = error.config;
       console.log(requestConfig)
       if(error.response.status == 401 && countRetry < 2) {
          try {
            countRetry++;
            const response =  await AuthencationApi.refreshToken()

            clearTokens()
            setTokens(response?.data?.access_token,response?.data?.refresh_token)
            error.config.headers.Authorization = response?.data?.access_token // set accessToken vào header
    
            countRetry = 0;
            return instance(error.config)
          } catch (refreshError) {
            store.dispatch(logout())
            clearTokens()
            clearClientID()
            return Promise.reject(refreshError);
          }
       }
       return Promise.reject(error.response.data);
    }    
  );

export default instance;