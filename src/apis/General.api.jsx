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

    async getDataContentPage() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/getContent-data')
    }

    async getDataLayoutComponent() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/getData-layoutComponent')
    }

    async getPageDataBySlug(slug) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/' + slug)
    }

    async createCommentBlog(id,payload) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/comment/store/' + id, payload)
    }
    
    async removeCommentBlog(id) {
        return await axiosIntance.delete(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/comment/delete/' + id)
    }

    async changeStatusComment(id,payload) {
        return await axiosIntance.put(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/comment/changeStatus/' + id,payload)
    }

    async getMoreCommentReply(id) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/comment/getMoreReply/' + id)
    }

    async getCommentByQuery(id,params) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/comment/getCommentByQuery/' + id,{params})
    }

}


export default new GeneralAPI();