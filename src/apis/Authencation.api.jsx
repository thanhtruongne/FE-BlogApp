import axiosIntance from '../utils/axios';
import { getRefreshToken } from '../utils/cookies';

class AuthencationApi {
    async loginAdminSystem(req) {
        return  await axiosIntance.post(import.meta.env.VITE_APP_SERVER + '/user/login',req);  
    }

    async refreshToken() {
        const refresh_Token = getRefreshToken()
        return  await axiosIntance.post(import.meta.env.VITE_APP_SERVER + '/user/refreshToken',{},{
            headers :{
                Refreshtoken : refresh_Token
            }
        });  
    }

    async logout() {
        return await  axiosIntance.post(import.meta.env.VITE_APP_SERVER + '/user/system/logout');
    }
    
    async profile() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER + '/user/profile')
    }
}


export default new AuthencationApi();