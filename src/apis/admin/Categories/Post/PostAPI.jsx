import axiosIntance from '../../../../utils/axios';


class PostAPI {
    
    async fetchStoreResourceData(payload) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/post/store', payload,{
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }

    async fetchGetAllData(payload) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/post/getData', payload)
    }

    // async searchingDataResource(payload) {
    //     return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/post/searchingData', payload)
    // }

    async fetchGetDataDetail(id) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/post/detail/' + id);
    }


    async fetchUpdateDataResource(id,payload) {
        return await axiosIntance.put(import.meta.env.VITE_APP_SERVER_LOCAL + '/post/update/' + id, payload);
    }

    // async fetchDataTreeCate() {
    //     return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/treeData')
    // }

    // async fetchChangeStatus(_id,status) {
    //     return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/changeStatus',{_id,status})
    // }

    // async fetchGetDetailResource(_id) {
    //     return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/detail/' + _id)
    // }

    // async fetchRemoveResource(_id) {
    //     return await axiosIntance.delete(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/remove/' + _id);
    // }

    // async getDataAllCategories(payload = null) {
    //     return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/getAll', {
    //         params : payload
    //     })
    // }
}

export default new PostAPI()