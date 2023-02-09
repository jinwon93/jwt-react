import { Fragment } from "react";
import  { useParams } from "react-router-dom";
import ArticleList from '../components/Article/articleList';
import SearchForm from "../components/Article/searchForm";
import  {ArticleContextProvider} from "../store/articleContext";



const ArticleListPage = () => {

    let {pageId}  = useParams();
    return(
        <ArticleContextProvider>
            <Fragment>
                <ArticleList item={pageId} />
                <SearchForm />
            </Fragment>
        </ArticleContextProvider>
    )
}