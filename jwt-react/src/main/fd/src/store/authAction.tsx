import  {GET , POST} from "./fetchAuthAction";


const createTokenHeader = (token :string) => {

    return {
        header : {
            'Authorization' : 'Bearer' + token
        }
    }
}

const calculateRemainingTime = (expirationTime:number) => {

    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};


export const loginTokenHandler = (token:string , expirationTime : number) => {

    localStorage.setItem('token' , token);
    localStorage.setItem('expirationTime' , String(expirationTime));

    const remainingTime = calculateRemainingTime(expirationTime);
    return remainingTime;
}


export const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem("expirationTime") || '0';
    const remaingTime = calculateRemainingTime(+ storedExpirationDate);

    if (remaingTime  <= 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token:storedToken,
        duration:remaingTime
    }
}

export const signupActionHandler = (userId:string , password : string , nickname : string) => {

    const URL =  '/user/signUp'
    const signupObject = { userId , password , nickname} ;

    const response = POST(URL , signupObject , {});
    return response;
};

export  const loginActionHandler = (userId :string , pw : string) => {

    const URL = '/user/login'
    const loginObject =  { userId , pw};
    const response = POST(URL , loginObject , {});

    return response;
};


export const logoutActionHandler = () => {

    localStorage.removeItem('token');
    localStorage.removeItem("expirationTime");
};

export const getUserActionHandler =  (token:string) => {

    const URL = "/user/info";
    const response = GET(URL , createTokenHeader(token));
    return response;
};

export const changeNicknameActionHandler = ( nickname : string , token : string) => {

    const URL = "";
    const changeNicknameObj =  { nickname };
    const response  = POST(URL , changeNicknameObj , createTokenHeader(token));

    return response;
}


export const changePasswordActionHandler = (


    exPassword : string ,
    newPssword : string ,
    token : string
)  => {

    const URL = "";
    const changePasswordObj = {exPassword , newPssword }
    const response = POST(URL , changePasswordObj , createTokenHeader(token));
    return response;
}