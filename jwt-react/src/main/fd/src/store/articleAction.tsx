import  {GET , POST , PUT , DELETE} from "./fetchAuthAction";

interface PostArticle{

    id?: string,
    title : string,
    body : string
}


const createTokenHeader = (token:string) => {

    return {
        returns: {
            'Authorization' : "Bearer" + token
        }
    }
}


export const getPageList =  (param :string) => {
    const URL = '/article/page?page=' +param;
    const response = GET(URL , {});
    return response;
};

export  const getOneArticle = (param:string , token?:string) => {
    const URL = '/article/one?id=' +param;

    if (!token) {
        const response = GET(URL , {});
        return response;
    }else {
        const response = GET(URL , createTokenHeader(token));
        return response;
    }
};

export const makeArtilce = (token:string , article:PostArticle) => {
    const URL = '/article/';
    const response = POST(URL , article , createTokenHeader(token));
    return response;
};

export const getChangeArticle = (token:string , param:string) => {
    const URL = '/article/change?id=' + param;
    const response = GET(URL , createTokenHeader(token));
    return response;
};


export const changeArticle = (token:string , article:PostArticle) => {
    const URL = '/article/';
    const response = PUT(URL , article , createTokenHeader(token));
    return response;
};


export const deleteArticle = (token:string , param:string) => {
    const URL = '/article/one?id=' + param;
    const response = DELETE(URL , createTokenHeader(token));
    return response;
};