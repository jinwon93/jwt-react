import React , { useState , useEffect , useCallback} from "react";
import * as authAction from './authAction';



// action 함수로 불러와 전역상태 로직

let logoutTimer : NodeJS.Timeout;


type Props = {children?: React.ReactNode }
type UserInfo = { userId : string , nickname : string};
type LoginToken ={

    grantType : string,
    accessToken : string,
    tokenExpiresIn : number
}

const AuthContext = React.createContext({

    token : '' ,
    userObj : {userId: ''},
    isLoggedIn : false ,
    isSuccess : false,
    isGetSuccess :false ,
    signup : (userId : string , password : string ,nickname : string) => {},
    login :  (userId :string , password :string) => {},
    logout : () => {},
    getUser : () => {},
    changeNickname : (nickname :string) => {},
    changePassword : (exPassword : string , newPassword : string) => {}

});



export  const AuthContextProvider:React.FC<Props> = (props) => {

    const tokenData = authAction.retrieveStoredToken();

    let initialToken : any;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token  ,setToken] = useState(initialToken);
    const [userObj  ,setUserObj] = useState({
        userId : ''
    });

    const [isSuccess , setIsSuccess] = useState<boolean>(false);
    const [isGetSuccess , setIsGetSuccess ] = useState<boolean>(false);


    const userIsLoggedIn = !!token;

    const signupHandler = (userId : string , password : string , nickname : string) => {
        setIsSuccess(false);
        const response = authAction.signupActionHandler(userId ,  password , nickname);

        response.then((result) => {
            if (result !== null) {
                setIsSuccess(true);
            }
        });
    }

    const loginHandler =  (userId : string , password: string) => {

        setIsSuccess(false);
        const data = authAction.loginActionHandler(userId , password);
        data.then((result) =>{
            if (result !== null) {
                const loginData:LoginToken = result.data;
                setToken(loginData.accessToken);
                logoutTimer = setTimeout(
                    logoutHandler,
                    authAction.loginTokenHandler(loginData.accessToken , loginData.tokenExpiresIn)
                );

                setIsSuccess(true);

            }
        })
    };

    const logoutHandler = useCallback(() => {
        setToken('');
        authAction.logoutActionHandler();
        if (logoutTimer)  {
            clearTimeout(logoutTimer);
        }
    } , []);

    const getUserHandler = () => {
        setIsGetSuccess(false);
        const data = authAction.getUserActionHandler(token);
        data.then((result) => {
            if (result !== null) {
                const userData:UserInfo = result.data;
                setUserObj(userData);
                setIsGetSuccess(true);
            }
        })
    }

    const changeNicknameHandler = (nickname: string) => {
        setIsSuccess(false);

        const data = authAction.changeNicknameActionHandler(nickname , token);
        data.then((result) =>{
            if (result !== null) {
                const userData:UserInfo = result.data;
                setUserObj(userData);
                setIsSuccess(true);
            }
        });
    };


    const changePasswordHandler = (exPassword : string , newPassword : string) => {

        setIsSuccess(false);
        const data = authAction.changePasswordActionHandler(exPassword , newPassword , token);
        data.then((result) =>{

            if (result != null) {
                setIsSuccess(true);
                logoutHandler();
            }
        });
    };

    useEffect(() => {

        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler , tokenData.duration);
        }
    } , [tokenData, logoutHandler]);

    const contextValue = {

        token,
        userObj ,
        isLoggedIn: userIsLoggedIn,
        isSuccess ,
        isGetSuccess ,
        signup : signupHandler,
        login : loginHandler,
        logout : logoutHandler,
        getUser : getUserHandler ,
        changeNickname : changeNicknameHandler,
        changePassword : changePasswordHandler

    }

    return (

        <AuthContext.Provider value={contextValue} >
            {props.children}
        </AuthContext.Provider>
    )
 }

export default  AuthContext;