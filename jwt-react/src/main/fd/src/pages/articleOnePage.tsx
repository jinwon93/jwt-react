import {Fragment} from "react";
import { useParams } from "react-router-dom";
import {ArticleContextProvider} from "../store/articleContext";
import RecommendContextProvider from "../store/recommendContext";


const ArticleOnePage = () => {
    let { articleId } = useParams();

    return (
        <Fragment>
            <ArticleContextProvider>

            </ArticleContextProvider>
            <RecommendContextProvider>

            </RecommendContextProvider>

        </Fragment>
    )
};

export default ArticleOnePage;