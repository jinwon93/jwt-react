import React , {useCallback , useContext , useEffect , useRef , useState } from "react";
import { Button , Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import ArticleContext from "../../store/articleContext";
import AuthContext from "../../store/authContext";
import {useForm} from "react-hook-form";


type  Props = {item:string | undefined }


interface  PostArticle {
    id?: string
    title : string,
    body : string
}



const CreateArticleForm:React.FC<Props> = (props) => {


    let navigate = useNavigate();

    const [updateArticle , setUpdateArticle] = useState<PostArticle>({

        title:'',
        body: ''
    });

    const articleCtx = useContext(ArticleContext);
    const authCtx = useContext(AuthContext);


    const titleRef = useRef<HTMLInputElement>(null);
    const mainRef = useRef<HTMLTextAreaElement>(null);

    const submitHandler = (event : React.FormEvent) => {

        event.preventDefault();

        let postArticle:PostArticle = {
            title: titleRef.current!.value,
            body: mainRef.current!.value
        }

        if (props.item){
            postArticle = { ...postArticle , id:props.item}
        }

        props.item
        ? articleCtx.updateArticle(authCtx.token , postArticle) : articleCtx.createArticle(postArticle , authCtx.token);
    }
}