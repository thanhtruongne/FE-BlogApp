import React from "react"

const HomeGeneral = {
    LOGIN : '/login',
    HOMEPAGE : '/home-page',
    NOTFOUND : '/404'
}



const userInfo = {
    DETAIL_USER : 'user/detail',
    LOGOUT : 'user/logout',
}



export default {
    ...HomeGeneral,
    ...userInfo
}