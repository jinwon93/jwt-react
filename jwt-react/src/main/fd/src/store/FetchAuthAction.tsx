import axios  ,{AxiosError , AxiosResponse} from "axios";
import {findRenderedComponentWithType} from "react-dom/test-utils";



type ServerError = {errorMessage  :string } ;
type  LoginFailType = { status : number , error : string};

// axios 에러캐치 추상화

interface  FetchData {

    method : string,
    url : string ,
    data? :{},
    header : {},
}


const fetchAuth = async (fetchData : FetchData) =>{

    const method = fetchData.method;
    const url  = fetchData.url;
    const data  = fetchData.data;
    const header  = fetchData.header;


    try {

        const response:AxiosResponse<any , any> | false =
            (method === 'get'  && (await  axios.get(url , header))) ||
            (method === 'post'  && (await  axios.post(url , data ,  header))) ||
            (method === 'put'  && (await  axios.put(url , data ,  header))) ||
            (method === 'delete'  && (await  axios.delete(url , header)));


        if (response && response.data.error) {
            console.log((response.data as  LoginFailType).error);
            alert("Wrong ID or Password");
            return null;
        }

        if (!response) {
            alert("false!");
            return null;
        }

        return response;
    }catch (err) {
        //error 부분 추상화 error가 catch되면 모두 null을 반환
        if (axios.isAxiosError(err)) {
            const serverError = err as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                console.log(serverError.response.data);
                alert("failed!");
                return null;
            }
        }

        console.log(err);
        alert("failed!");
        return  null;
    }

}

// Rest API 메소드 분리 

const GET  = ( url : string , header:{}) => {
    const response = fetchAuth({method : 'get' , url  , header});
    return response;
}

const POST  = (url : string , data : {} , header:{}) => {
    const response = fetchAuth({method : 'post' , url  , data , header })
    return response;
}

const PUT = (url : string , data : {} , header:{}) => {
    const response = fetchAuth({method : 'put' , url  , data  , header})
    return response;
}

const DELETE  = (url : string , data : {} , header:{}) => {
    const response = fetchAuth({method: 'delete', url , data , header})
    return response;
}

export  { GET , POST , PUT , DELETE}