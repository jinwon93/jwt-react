import { GET , POST , DELETE} from "./fetchAuthAction";

const createTokenHeader = (token:string) => {

    return {

        headers:{
            'Authorization' : 'Bearer' + token
        }
    }
}


// 추천숫자  , 추천여부
export const getRecommends = (param:string, token?:string) => {
    const URL = '/recommend/list?id=' + param;
    const response = (token ? GET(URL, createTokenHeader(token)) : GET(URL, {}));
    return response;
}

//추천 생성
export const makeRecommend = (id_str : string ,token : string) => {
    const URL = '/recommend/'
    const id = +id_str;
    const response = POST(URL , {id:id} , createTokenHeader(token));
    return response;
}


//추천 삭제
export  const deleteRecommend = (param : string, token:string) => {

    const URL = '/recommend/one?id=' + param;
    const response = DELETE(URL, createTokenHeader(token));
    return response;
}
