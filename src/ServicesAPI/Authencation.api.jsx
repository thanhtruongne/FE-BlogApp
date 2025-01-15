import React from "react";
import axiosIntance from '../utils/axios';

class AuthencationApi {
    async loginAdminSystem(req) {
        return  await axiosIntance.post(import.meta.env.VITE_APP_SERVER + '/user/login',req);  
    }

    async logout() {
        return await  axiosIntance.post(import.meta.env.VITE_APP_SERVER + '/user/system/logout');
    }
    
    async profile() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER + '/user/profile')
    }
}


export default new AuthencationApi();