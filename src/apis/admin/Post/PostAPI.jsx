import axiosIntance from '../../../utils/axios';


class PostAPI {
    
    async fetchStoreResourceData(payload) {
        console.log(payload)
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/post/store', payload,{
            headers: {
                "content-type": 'multipart/form-data'
            }
        })
    }

    async fetchGetAllData(params) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/post/getData',params)
    }

    async searchingDataResource(payload) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/post/searchingData', payload)
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