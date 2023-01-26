import React , { useState } from "react";

import * as  recommendAction from "./recommendAction";


type  Props = { children? : React.ReactNode }

type  Recommends = {

    recommendNum : number
    recommended : boolean
}


interface  RecommendCtx {

    recommends : Recommends  | undefined;
    isSuccess : boolean;
    isChangeSuccess : boolean;
    getRecommends : (param : string , token? : string) => void;
    postRecommend : (id : string , token:string) => void;
    deleteRecommned : (param : string , token : string) => void;
}
