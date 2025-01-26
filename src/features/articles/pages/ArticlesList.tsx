import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../global-store/store";
import { setArticles, setFilter, setPage } from "../reducers/articleReducer";
import { useArticles } from "../hooks/useArticles";
import ArticleCard from "../components/ArticleCard";
import ArticlesFilter from "../components/ArticlesFilter";
import PaginationControls from "../components/PaginationControls";

const ArticlesList: React.FC = () => {
  const dispatch = useDispatch();

  const { articles, filter, page, favorites } = useSelector((state: RootState) => state.articles);

  const articlesPerPage = 9;

  const { data, isLoading } = useArticles();

  useEffect(() => {
    if (data) {
      dispatch(setArticles(data));
    }
  }, [data, dispatch]);

  const filteredArticles = useMemo(() => {
    dispatch(setPage(1));
    if (!articles) return [];
    return articles.filter(article => article.title.toLowerCase().includes(filter.toLowerCase()));
  }, [articles, filter, dispatch]);

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
          <p className="text-6xl font-bold text-gray-500">Loading articles...</p>
        </div>
      </div>
    );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-6xl font-bold mb-6 text-center text-blue-500">Articles</h1>

      <div className="mb-6 flex justify-center">
        <ArticlesFilter filter={filter} setFilter={value => dispatch(setFilter(value))} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedArticles.map(article => (
          <ArticleCard key={article.id} id={article.id} title={article.title} content={article.content} isFavorite={favorites.includes(article.id)} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={newPage => dispatch(setPage(newPage))} />
      </div>
    </div>
  );
};

export default ArticlesList;
