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


const RecommendContext = React.createContext<RecommendCtx>({

    recommends : undefined,
    isSuccess : false ,
    isChangeSuccess : false ,
    getRecommends : () => {} ,
    postRecommend : () => {} ,
    deleteRecommned : () => {} ,
});



export  const RecommendContextProvider: React.FC<Props> = (props) => {

    const [recommends , setRecommends] = useState<Recommends>();
    const [isSuccess , setIsSuccess] = useState<boolean>(false);
    const [isChangeSuccess , setIsChangeSuccess] = useState<boolean>(false);

    const getRecommendHandler = (param : string , token?:string) => {

    }

    return <RecommendContext>


    </RecommendContext>
}


