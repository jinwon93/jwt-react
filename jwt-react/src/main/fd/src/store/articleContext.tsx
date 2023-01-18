import React , { useState , useEffect , useCallback , useRef} from "react";
import * as  articleAcion  from  './articleAction';


type  Props = {childred? : React.ReactNode}
type  ArticleInfo = {
    articleId : number ,
    memberNickname : string,
    articleTitle : string ,
    articleBody : string ,
    creatAt : string ,
    updatedAt? : string ,
    isWritten? : boolean
}

