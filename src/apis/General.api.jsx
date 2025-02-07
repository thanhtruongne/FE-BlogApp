import axiosIntance from '../utils/axios';

class GeneralAPI {
    async getDataLayout() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER + '/layout/get-data-layout')
    }
}


export default new GeneralAPI();