import slugify from "slugify";

export const convertStringToSlug = (string) => {
    if(!string || string == '') 
        return null;
    return slugify(string ,{lower : true,strict : true,remove: /[*+~.()'"!:@]/g})    
}




export default {
    ADMIN : "Admin",
    GOC_NHIN_SLUG : 'goc-nhin',
    VIDEO_SLUG : 'video',
    KHOA_HOC_SLUG : 'khoa-hoc',
    CONG_NGHE_SLUG : 'cong-nghe',
}

