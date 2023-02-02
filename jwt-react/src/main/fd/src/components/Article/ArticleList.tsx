import { BootstrapTable } from "react-bootstrap-table";
import { Button } from "react-bootstrap";
import { useCallback  , useContext , useState , useEffect} from "react";
import AuthContext from "../../store/authContext";
import { Link ,  useNavigate } from "react-router-dom";
import ArticleContext from "../../store/articleContext";
import Paging from "./Paging";


type  Props = { item : string |  undefined }

type ArticleInfo = {

    articleId : number,
    memberNickname : string,
    articleTitle  : string,
    articleBody? : string,
    cratedAt: string,
    updateAt? : string ,
    isWritten? : boolean

};


const ArticleList:React.FC<Props> = (props) => {

    let navigate = useNavigate();
    const pageId = String(props.item);

    const columns = [{
        dataField :  'articleId' ,
        text : '#',
        headerStyle : () => {
            return { width: "8%"};
        }
    } ,{
       dataField: 'articleTile' ,
       text: '제목' ,
       headerStyle : () => {
           return { width:  "65%"};
       },
       events :  {
           onClick :  (e:any, column:any, columIndex:any, row:any, rowIndex:any) => {
               const articleIdNum: string = row.articleId;
               navigate(`../article/${articleIdNum}`);
           }
       }
    } , {
        dataField: 'memberNickname',
        text: '닉네임'
    } , {
        dataField: 'createAt',
        text: '작성일'
    },]


    const authCtx = useContext(AuthContext);
    const articleCtx = useContext(ArticleContext);

    const [AList, setAList] = useState<ArticleInfo[]>([]);
    const [maxNum, setMaxNum] = useState<number>(1);


    let isLogin = authCtx.isLoggedIn;

    const fetchListHandler = useCallback(
        () => {
            articleCtx.getPageList(pageId)
        },
        [],
    );

    useEffect(() => {
        fetchListHandler();
    } , [fetchListHandler]);


    useEffect(() => {
        if (articleCtx.isSuccess) {
            setAList(articleCtx.page);
            setMaxNum(articleCtx.totalPages);
        }
    }, [articleCtx]);



    return (
        <div>
            <BootstrapTable keyField='id' data={AList} >

                <div>{isLogin &&
                    <Link to="/create">
                        <Button>글 작성</Button>
                    </Link>
                }
                </div>
                <Paging currentPage={Number(pageId)} maxPage={maxNum} />
            </BootstrapTable>

        </div>
    )
}


export  default ArticleList;