import React  ,{ useState  , useRef , useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";



const CreateAccountForm = () => {

    let navigate = useNavigate();

    const authCtx  = useContext(AuthContext);
    const userIdInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const nicknameInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event : React.FormEvent) => {

        event.preventDefault();


        const enteredUserId = userIdInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        const enteredNickname = nicknameInputRef.current!.value;


        authCtx.signup(enteredUserId , enteredPassword , enteredNickname);

        if (authCtx.isSuccess) {
            return navigate("/" , {replace : true});
        }
    }

    return (
        <section >
            <h1>Create Account</h1>
            <form onSubmit={submitHandler}>
                <div >
                    <label htmlFor="userId">Your ID</label>
                    <input type="text" id="userId" required ref={userIdInputRef} />
                </div>
                <div >
                    <label htmlFor="password">Your password</label>
                    <input type="password" id="password" required ref={passwordInputRef} />
                </div>
                <div >
                    <label htmlFor="nickname">NickName</label>
                    <input type="text" id="text" required ref={nicknameInputRef} />
                </div>
                <div >
                    <button type="submit">Submit</button>
                </div>
            </form>
        </section>
    )
}


export default CreateAccountForm;


