
const HomeGeneral = {
    LOGIN: '/login',
    HOMEPAGE: '/home',
    SLUG_DATA: "/*",
    NOTFOUND: '/404'
}



const userInfo = {
    INFO_USER_DETAIL: '/user/detail-info',
    POST_VIEWED: '/user/viewed-post',
    POST_SAVED: '/user/saved-post',
    LOGOUT: '/user/logout',
}



export default {
    ...HomeGeneral,
    ...userInfo
}