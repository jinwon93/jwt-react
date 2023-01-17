import React , { useContext , useRef} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../store/authContext";


const ChangePassword = () => {


    let navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    const exPasswordInputRef = useRef<HTMLInputElement>(null);
    const newPasswordInputRef = useRef<HTMLInputElement>(null);
    const newPasswordAgainInputRef = useRef<HTMLInputElement>(null);

    const submitHandler =  (event : React.FormEvent) => {

        event.preventDefault();
        const enteredExPassword = exPasswordInputRef.current!.value;
        const enteredNewPassword = newPasswordInputRef.current!.value;
        const enterredNewPasswordAgain = newPasswordAgainInputRef.current!.value;


        if (enteredNewPassword !== enterredNewPasswordAgain) {
            alert("Password Write Correct!");
            return;
        }

        authCtx.changePassword(enteredExPassword , enteredNewPassword);
        if (authCtx.isSuccess) {
            alert("다시 로그인 하세요.")
            authCtx.logout();
            navigate("/" , {replace : true});
        }

    }
    return (
        <form onSubmit={submitHandler} >


            <div>
                <label htmlFor='ex-password'>Old Passowrd</label>
                <input
                type='password'
                id='ex-password'
                minLength={8}
                ref={exPasswordInputRef}
                />
                <label htmlFor='New-password'>New Passowrd</label>
                <input
                    type='password'
                    id='new-password'
                    minLength={8}
                    ref={newPasswordInputRef}
                />
                <label htmlFor='New-password'>New Passowrd Again</label>
                <input
                    type='password'
                    id='new-password'
                    minLength={8}
                    ref={newPasswordAgainInputRef}
                />
            </div>
            <div>
                <button type='submit'>Change Password</button>
            </div>
        </form>
    );
}

export  { ChangePassword }
