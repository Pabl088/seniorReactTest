import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../global-store/store";
import { setFilter, setPage } from "../reducers/articleReducer";
import { useArticles } from "../hooks/useArticles";
import ArticleCard from "../components/ArticleCard";
import ArticlesFilter from "../components/ArticlesFilter";
import PaginationControls from "../components/PaginationControls";

const ArticlesList: React.FC = () => {
  const dispatch = useDispatch();

  const { isLoading } = useArticles();

  const { articles, filter, page, favorites } = useSelector((state: RootState) => state.articlesStore);

  const articlesPerPage = 9;

  useEffect(() => {
    dispatch(setPage(1));
  }, [filter, dispatch]);

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
