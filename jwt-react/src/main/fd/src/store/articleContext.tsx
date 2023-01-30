import React , { useState , useEffect , useCallback , useRef} from "react";
import * as  articleAcion  from  './articleAction';



type  Props = {childred? : React.ReactNode}

type  ArticleInfo = {
    articleId : number ,
    memberNickname : string,
    articleTitle : string ,
    articleBody : string ,
    cratedAt : string ,
    updatedAt? : string ,
    isWritten? : boolean
};


interface PostArticle {
    id? : string ,
    title :  string ,
    body : string

}

// 전역객체
interface Ctx {
    article?: ArticleInfo  | undefined;
    page : ArticleInfo[];
    isSuccess : boolean;
    isGetUpdateSuccess : boolean;
    totalPages : number;
    getPageList : (pageId : string) => void;
    getArticle  : (param : string , token?:string) => void;
    createArticle : (article :PostArticle , token:string) => void;
    getUpdateArticle  : (token :string , param : string) => void;
    updateArticle  : (token :string , article : PostArticle) => void;
    deleteArticle  : (token :string , param : string) => void;
}


const ArticleContext = React.createContext<Ctx>({

    article : undefined,
    page : [] ,
    isSuccess : false ,
    isGetUpdateSuccess : false ,
    totalPages : 0 ,
    getPageList :  () => {},
    getArticle  : () => {} ,
    createArticle : () => {},
    getUpdateArticle : () => {},
    updateArticle : () => {} ,
    deleteArticle : () => {}
});

export  const ArticleContextProvider: React.FC<Props> = (props) => {

    const [article  , setArticle] = useState<ArticleInfo>();
    const [page, setPage] = useState<ArticleInfo[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState<boolean>(false);


    // 게시물 리스트를 얻는 함수
    const getPageHandler = async  (pageId : string) => {
        setIsSuccess(false);
        const data = await  articleAcion.getPageList(pageId);
        const page : ArticleInfo[] = data?.data.content;
        const pages: number = data?.data.totalPages;
        setPage(page);
        setTotalPages(pages);
        setIsSuccess(true);
    }

    // 게시물 한개를 얻는 함수
    const getArticleHandler = (param : string , token? :string) => {
        setIsSuccess(false);
        const data = (token ?
         articleAcion.getOneArticle(param ,token)
                :articleAcion.getOneArticle(param))
        data.then((result) => {
            if (result !== null) {
                const article:ArticleInfo = result.data;
                setArticle(article);
            }
        })
        setIsSuccess(true);
    }

    //게시물 생성함수
    const createArticleHandler = (article:PostArticle , token: string) => {
        setIsSuccess(false);
        const  data  = articleAcion.makeArtilce(token , article);
        data.then((result) => {
            if (result !== null) {
                console.log(isSuccess);
            }
        })
        setIsSuccess(true);
    }

    // 수정 할때 이전의 적었던 게시물 내용을 불러오는 함수
    const getUpdateArticleHandler = async (token:string , param : string) => {
        setIsGetUpdateSuccess(false);
        const updateData = await  articleAcion.getChangeArticle(token , param);
        const article : ArticleInfo = updateData?.data;
        setArticle(article);
        setIsGetUpdateSuccess(true);
    }

    // 수정한 게시물을 서버에 등록하는 함수
    const updateArticleHandler = (token : string , article :PostArticle) => {
        setIsSuccess(false);
        const data = articleAcion.changeArticle(token , article);
        data.then((result) => {
            if (result !==  null) {
                console.log(isSuccess);
            }
        })
        setIsSuccess(true);
    }
    // 삭제
    const deleteArticleHandler = (token : string , param : string) => {
        setIsSuccess(false);
        const data = articleAcion.deleteArticle(token , param);
        data.then((result) =>{
            if (result !== null) {
                console.log(isSuccess);
            }
        })

        setIsSuccess(true);
    }

    const contextValue:Ctx = {
        article ,
        page ,
        isSuccess ,
        isGetUpdateSuccess ,
        totalPages ,
        getPageList : getPageHandler ,
        getArticle : getArticleHandler ,
        createArticle : createArticleHandler ,
        getUpdateArticle : getUpdateArticleHandler,
        updateArticle : updateArticleHandler ,
        deleteArticle : deleteArticleHandler
    }

    return (

        <ArticleContext.Provider value={contextValue}>
            {props.childred}
        </ArticleContext.Provider>
    )
}

export default ArticleContext;