import axiosIntance from '../../../utils/axios';


class CategoriesAPI {
    
    async storeCategoriesData(payload) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/store', payload)
    }

    async updateCategoriesData(id,payload) {
        return await axiosIntance.put(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/update/' + id, payload)
    }

    async fetchDataTreeCate() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/treeData')
    }

    async fetchChangeStatus(_id,status) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/changeStatus',{_id,status})
    }

    async fetchGetDetailResource(_id) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/detail/' + _id)
    }

    async fetchRemoveResource(_id) {
        return await axiosIntance.delete(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/remove/' + _id);
    }

    async getDataAllCategories(payload = null) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_LOCAL + '/categories/getAll', {
            params : payload
        })
    }
}

export default new CategoriesAPI()