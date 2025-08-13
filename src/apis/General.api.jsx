import axiosIntance from '../utils/axios';

class GeneralAPI {
    async getDataLayout() {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/setting/get-data-layout')
    }

    async getDataPostNew(params) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/getData', { params })
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

    async createCommentBlog(id, payload) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/comment/store/' + id, payload)
    }
    async getMoreCommentReply(id) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/comment/getMoreReply/' + id)
    }

    async getCommentByQuery(id, params) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/comment/getCommentByQuery/' + id, { params })
    }

    async likeCommentPost(id, postId) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/comment/like/' + id, {
            postId
        })
    }

    async unLikeCommentPost(id, postId) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/comment/unLike/' + id, {
            postId
        })
    }

    async handleSavePost(postID) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/post/save-or-unsave/' + postID)
    }

}


export default new GeneralAPI();