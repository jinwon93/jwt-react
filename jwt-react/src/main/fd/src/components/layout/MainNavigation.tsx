import { useContext , useEffect , useState} from "react";

import {Link} from "react-router-dom";



// import classes from "*.module.css";
import AuthContext from "../../store/AuthContext";



const MainNavigation = () => {

    const authCtx = useContext(AuthContext);
    const [userId , setUserId] = useState('')
    let isLogin = authCtx.isLoggedIn;
    let isGet = authCtx.isGetSuccess;


    const callback = (str:string) => {
        setUserId(str);
    }

    useEffect(() => {
        if (isLogin) {
            console.log("start!!")
            authCtx.getUser();
        }
    }, [isLogin]);

    useEffect(() => {

        if (isGet) {
            callback(authCtx.userObj.userId);
        }
    }, [isGet]);

    const toggleLogoutHandler =() => {

        authCtx.logout();
    }


    return (

        <header className="">
            <Link to='/'><div className="">Home</div></Link>
            <nav>
                <ul>
                    <li>{!isLogin && <Link to='/user/login'>Login</Link>}</li>
                    <li>{!isLogin && <Link to='/user/signup'>Sign-Up</Link>}</li>
                    <li>{isLogin && <Link to='/user/profile'>{userId}</Link>}</li>
                    <li>{isLogin && <button onClick={toggleLogoutHandler}>Logout</button>}</li>
                </ul>
            </nav>
        </header>
    )
}

export  default  MainNavigation;