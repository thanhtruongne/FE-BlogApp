import axios from 'axios';
import {getAccessToken, getRefreshToken,getClientID} from './cookies'
import showMessage from '../Helpers/showMessage';
const instance = axios.create({
    baseURL: import.meta.env.REACT_APP_SERVER,
    withCredentials: true,
    // headers: {
    //   "Content-Type": "application/json",
    // },
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const clientID = getClientID();
    if(clientID) {
      config.headers['X-Client-ID'] = clientID;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response.data,
    (error) => error.response.data
  );

export default instance;