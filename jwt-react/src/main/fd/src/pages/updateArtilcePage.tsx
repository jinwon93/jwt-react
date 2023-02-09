import { useParams } from "react-router-dom";
import CreateArticleForm from "../components/Article/createArtilceForm";
import { ArticleContextProvider } from "../store/articleContext";


const updateArtilcePage = () => {

    let { articleId } = useParams();


    return (
        <ArticleContextProvider>
            <CreateArticleForm item={articleId} />
        </ArticleContextProvider>
    )
}


export default updateArtilcePage();