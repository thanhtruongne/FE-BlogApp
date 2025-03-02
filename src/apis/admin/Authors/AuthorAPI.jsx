import axiosIntance from '../../../utils/axios';


class AuthorAPI {
    
    async fetchStoreResourceData(payload) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/author/store', payload,{
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }

    async fetchGetAllData(params) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/author/getData', {
            params 
        })
    }


    async fetchHandleChangeStatus(payload) {
        return await axiosIntance.put(import.meta.env.VITE_APP_SERVER_LOCAL + '/author/changeStatus',payload)
    }

    async fetchGetDetailByAuthorID(id) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/author/get-detail/' + id)
    }

    async fetchStoreRoleAuthor(payload) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/author/roles/store', payload)
    }

    async fetchGetDataRoleAuthor(params) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/author/roles/getData', {params})
    }

   


    async fetchRemoveRoleAuthor(_id) {
        return await axiosIntance.delete(import.meta.env.VITE_APP_SERVER_LOCAL + '/author/roles/delete/' + _id, )
    }
}

export default new AuthorAPI()