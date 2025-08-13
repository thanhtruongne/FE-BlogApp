import slugify from "slugify";

export const convertStringToSlug = (string) => {
    if(!string || string == '') 
        return null;
    return slugify(string ,{lower : true,strict : true,remove: /[*+~.()'"!:@]/g})    
}

export const extractMailName = (email) => {
    const match = email?.match(/^([^@]+)@/);
    return match ? match[1] : '';
  };


export default {
    ADMIN : "Admin",
    GOC_NHIN_SLUG : 'goc-nhin',
    VIDEO_SLUG : 'video',
    KHOA_HOC_SLUG : 'khoa-hoc',
    CONG_NGHE_SLUG : 'cong-nghe',
    POST_DETAL : 'posts',
    CATEGORIES_DETAIL : 'categories',
    CATEGORIES_MEDIA : 'categories_media',
    CATEGORIES_VIDEO : "categories_video",
    CATEGORIES_TOPIC : "categories_topic",
    // QUERYKEY
    QUERY_KEY_DATA_ROUTER_SLUG : "getDataRouterSlug"

}

