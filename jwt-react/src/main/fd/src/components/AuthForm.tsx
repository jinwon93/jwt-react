import React , { useState , useRef , useContext} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../store/authContext";



const AuthForm = () =>{

    const userIdInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);



    let navigate = useNavigate();

    const [isLoading , setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);

    const submitHandler = async (event:React.FormEvent) => {
        event.preventDefault();

        const enteredUserId = userIdInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;

        setIsLoading(true);
        authCtx.login(enteredUserId , enteredPassword);
        setIsLoading(false);


        if (authCtx.isSuccess) {
            navigate("/" , {replace:true});
        }
    }


    return (

        <section className="">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className="">
                    <label htmlFor="userId">Your UserId</label>
                    <input type="text" id="UserId" required ref={userIdInputRef} />
                </div>
                <div className="">
                    <label htmlFor="password">Your password</label>
                    <input type="password" id="password" required ref={passwordInputRef} />
                </div>
                <div className="">
                    <button type="submit">Login</button>
                    {isLoading && <p>Loading</p>}
                    <p>Create Account</p>
                </div>
            </form>
        </section>
    )
}

export default  AuthForm;