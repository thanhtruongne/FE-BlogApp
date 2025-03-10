import axiosIntance from '../utils/axios';

class GeneralAPI {
    async getDataLayout() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/setting/get-data-layout')
    }

    async getDataPostNew(params) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/getData',{params})
    }

    async getCategoryNavbar() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/categories/getData')
    }

}


export default new GeneralAPI();