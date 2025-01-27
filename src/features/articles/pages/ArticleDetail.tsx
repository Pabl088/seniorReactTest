import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../global-store/store";
import BackButton from "../components/BackButton";
import { LexicalArticleEditor } from "../components/LexicalArticleEditor";
import { NotFoundArticles } from "../components/NotFoundArticles";

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = useSelector((state: RootState) => state.articlesStore.articles.find(article => article.id === Number(id)));

  if (!article) {
    return <NotFoundArticles />;
  }

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <div className="mb-6">
        <LexicalArticleEditor articleId={article.id} text={article.title} toEdit="TITLE" />
        <p className="text-gray-400 mt-2">By {article.author}</p>
      </div>

      <LexicalArticleEditor articleId={article.id} text={article.content} toEdit="CONTENT" />

      <div className="mt-4">
        <BackButton />
      </div>
    </div>
  );
};

export default ArticleDetail;
