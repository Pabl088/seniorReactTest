import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../global-store/store";
import BackButton from "../components/BackButton";
import { LexicalEditor } from "../components/LexicalEditor";

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = useSelector((state: RootState) => state.articlesStore.articles.find(article => article.id === Number(id)));

  if (!article) {
    return (
      <div className="flex flex-col justify-center h-screen">
        <p className="text-white text-6xl font-bold">Article not found</p>
        <BackButton />
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <header className="mb-6">
        <h1 className="text-5xl font-bold text-blue-500">{article.title}</h1>
        <p className="text-gray-400 mt-2">By {article.author}</p>
      </header>

      <LexicalEditor article={article} />

      <div className="mt-4">
        <BackButton />
      </div>
    </div>
  );
};

export default ArticleDetail;
