import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../global-store/store";
import { useArticles } from "../hooks/useArticles";
import ArticleCard from "../components/ArticleCard";
import ArticlesFilter from "../components/ArticlesFilter";
import PaginationControls from "../components/PaginationControls";
import { useNavigate } from "react-router-dom";
import { NotFoundArticles } from "../components/NotFoundArticles";

const ArticlesList: React.FC = () => {
  const navigate = useNavigate();

  const { isLoading } = useArticles();

  const { articles, favorites } = useSelector((state: RootState) => state.articlesStore);

  const [filter, setFilter] = useState("");

  const [page, setPage] = useState(1);

  const articlesPerPage = 9;

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    return articles.filter(article => article.title.toLowerCase().includes(filter.toLowerCase()));
  }, [articles, filter]);

  const paginatedArticles = useMemo(() => {
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, page, articlesPerPage]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <p className="text-6xl font-bold text-white">Loading articles...</p>
        </div>
      </div>
    );

  return (
    <div className="p-4 mx-auto relative">
      <h1 className="text-6xl font-bold mb-6 text-center text-blue-500">Articles</h1>

      <div className="mb-5 md:absolute md:top-28 md:right-10 md:z-5">
        <button onClick={() => navigate("/articles/create")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Article
        </button>
      </div>

      <div className="mb-5 md:absolute md:top-28 md:right-52 md:z-5">
        <button onClick={() => navigate("/articles/categories")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          By Categories
        </button>
      </div>

      <div className="mb-3 flex justify-center md:justify-start">
        <ArticlesFilter filter={filter} setFilter={value => setFilter(value)} />
      </div>

      {paginatedArticles.length === 0 ? (
        <NotFoundArticles />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map(article => (
              <ArticleCard key={article.id} id={article.id} title={article.title} content={article.content} isFavorite={favorites.includes(article.id)} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={newPage => setPage(newPage)} />
          </div>
        </>
      )}
    </div>
  );
};

export default ArticlesList;
