import slugify from "slugify";

export const convertStringToSlug = (string) => {
    if(!string || string == '') 
        return null;
    return slugify(string ,{lower : true,strict : true,remove: /[*+~.()'"!:@]/g})    
}




export default {
    ADMIN : "Admin",
    GOC_NHIN_SLUG : 'goc-nhin'
}

