import React from "react";
import axiosIntance from '../utils/axios';

class GeneralAPI {
    async getDataLayout() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER + '/layout/get-data-layout')
    }

    async getAllDataUsers() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER + '/user/get-data-all')
    }
}


export default new GeneralAPI();