import axiosIntance from '../../utils/axios';

class GeneralAPI {
    async getDataSetting() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/setting/getData')
    }

    async storeDataSetting(payload) {
        return await axiosIntance.put(import.meta.env.VITE_APP_SERVER_LOCAL + '/setting/storeData', payload, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }

    async changeStatusComment(id, payload) {
        return await axiosIntance.put(import.meta.env.VITE_APP_SERVER_LOCAL + '/post/comment/changeStatus/' + id, payload)
    }
    async removeCommentBlog(id) {
        return await axiosIntance.delete(import.meta.env.VITE_APP_SERVER_LOCAL + '/post/comment/delete/' + id)
    }

    async markAReadNotify(id, params) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/notify/markAReadNotify/' + id, { params })
    }

    async getNotifications(params) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/notify/getAll', {
            params
        })
    }
}


export default new GeneralAPI();