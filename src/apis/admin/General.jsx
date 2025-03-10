import axiosIntance from '../../utils/axios';

class GeneralAPI {
    async getDataSetting() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/setting/getData')
    }

    async storeDataSetting(payload) {
        return await axiosIntance.put(import.meta.env.VITE_APP_SERVER_LOCAL + '/setting/storeData',payload , {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }
}


export default new GeneralAPI();