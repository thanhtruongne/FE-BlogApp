import axiosIntance from '../../utils/axios'


class GeneralAdminApi {
    async getAllDataUsers(payload) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/user/get-userData-all',{
            params : payload
        })
    }

    async updateDataUser(payload,id) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/user/update/' + id, payload)
    }

    async getDetailUser(id) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/user/detail/' + id)
    }
    async removeResourceUser(id) {
        return await axiosIntance.delete(import.meta.env.VITE_APP_SERVER_LOCAL + '/user/delete/' + id)
    }

}

export default new GeneralAdminApi()