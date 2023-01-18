import { GET , POST , DELETE} from "./fetchAuthAction";


type  Comment = {
    
    articleId  : string ,
    body : string
}

const createTokenHeader = (token : string) => {
    
    
    return {
        headers : {
            'Authorization' : 'Bearer' + token
        }
    }
}



//댓글조회
export  const getComments = (param:string , token?:string) => {
    const URL  = '/comment/List?id=' + param; 
    const response  = (token  ? GET(URL , createTokenHeader(token)) : GET(URL , {}));
    return response;
}


//추천생성
export  const makeComments = (comment:Comment , token:string) => {
    const URL  = '/comment/';
    const response  = POST(URL , comment , createTokenHeader(token));
    return response;
}

//삭제
export const deleteComment = (param : string , token:string) => {
    const URL = '/comment/one?id=' +param;
    const response = DELETE(URL , createTokenHeader(token));
    return response;
}



