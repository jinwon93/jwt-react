import React from  "react";
import {redirect , Route} from "react-router-dom";





const RestrictedRoute = (props:any) => {

    const token = localStorage.getItem("auth");

    return <>

        {token ? <Route {...props} />  : redirect("/") }

    </>
}


export  default  RestrictedRoute;