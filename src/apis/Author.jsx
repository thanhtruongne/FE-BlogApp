import axiosIntance from '../utils/axios';

class AuthorAPI {
    async checkEmailExists(email) {
        return await axiosIntance.get(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/author/check-email', {params : {email}})
    }

    async loginForm(payload) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/author/login', payload)
    }

    async registerForm(payload) {
        return await axiosIntance.post(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/author/register', payload)
    }

    async changeFieldsDataUser(id,payload) {
        return await axiosIntance.put(import.meta.env.VITE_APP_SERVER_GENERAL_LOCAL + '/user/changeFields/' + id, payload , {
            headers: {
                "content-type": 'multipart/form-data'
            }
        })
    }

}


export default new AuthorAPI();