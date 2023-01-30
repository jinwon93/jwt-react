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
        setIsSuccess(false);
        const data =  (token ?
                       recommendAction.getRecommends(param , token )
                : recommendAction.getRecommends(param));
        data.then((result) => {
            if (result !== null) {
                const recommens:Recommends = result.data;
                setRecommends(recommens);
            }
        })
        setIsSuccess(true);
    }

    const postRecommendHandler = async  (id : string , token: string) => {
        setIsSuccess(false);
        const postData = await recommendAction.makeRecommend(id , token);
        const msg  = await  postData?.data;
        const getData = await  recommendAction.getRecommends(id , token)
        const recommends : Recommends = getData?.data;
        setRecommends(recommends);
        setIsChangeSuccess(true);
    }

    const deleteRecommendHandler = async  (param : string , token: string) => {
        setIsSuccess(false);
        const deleteData = await recommendAction.deleteRecommend(param , token);
        const msg  = await  deleteData?.data;

        const getData = await  recommendAction.getRecommends(param , token)
        const recommends : Recommends = getData?.data;
        setRecommends(recommends);
        setIsChangeSuccess(true);
    }


    const contextValue:RecommendCtx = {
        recommends,
        isSuccess,
        isChangeSuccess,
        getRecommends: getRecommendHandler,
        postRecommend: postRecommendHandler,
        deleteRecommned: deleteRecommendHandler
    }
    return(
        <RecommendContext.Provider value={contextValue}>
            {props.children}
        </RecommendContext.Provider>
    )
}


export  default RecommendContextProvider;