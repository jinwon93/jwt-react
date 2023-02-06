import CreateArticleForm from "../components/Article/createArtilceForm";
import {ArticleContextProvider} from "../store/articleContext";

const CreateArticlePage = () => {

    return(
        <ArticleContextProvider>
            <CreateArticleForm item={undefined} />
        </ArticleContextProvider>
    )
}

export default CreateArticlePage;