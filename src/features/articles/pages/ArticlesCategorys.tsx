import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../global-store/store";
import ArticleCard from "../components/ArticleCard";
import PaginationControls from "../components/PaginationControls";
import BackButton from "../components/BackButton";

const ArticlesCategorys: React.FC = () => {
  const { articles, favorites } = useSelector((state: RootState) => state.articlesStore);

  const [filter, setFilter] = useState("");

  const [page, setPage] = useState(1);

  const articlesPerPage = 9;

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const categories = useMemo(() => {
    const categoryMap: Record<string, Set<string>> = {};

    articles.forEach(article => {
      if (!categoryMap[article.category]) {
        categoryMap[article.category] = new Set();
      }
      categoryMap[article.category].add(article.subCategory || "");
    });

    return Object.entries(categoryMap).map(([category, subCategories]) => ({
      category,
      subCategories: Array.from(subCategories),
    }));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (!filter) return articles;
    return articles.filter(article => article.category === filter || (article.subCategory && article.subCategory === filter));
  }, [articles, filter]);

  const paginatedArticles = useMemo(() => {
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, page, articlesPerPage]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handleCategoryClick = (category: string) => {
    setFilter(category);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      <h1 className="text-5xl font-bold text-blue-500 md:mb-16">Categories</h1>

      <div className="mb-5 md:absolute md:top-14 md:left-10 md:z-5">
        <BackButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {categories.map(({ category, subCategories }) => (
          <div key={category} className="bg-gray-800 p-4 rounded shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{category}</h2>
              <button onClick={() => handleCategoryClick(category)} className="text-blue-400 hover:underline">
                View All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {subCategories.map(subCategory => (
                <button
                  key={subCategory}
                  onClick={() => handleCategoryClick(subCategory || category)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  {subCategory || "General"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-blue-500 mb-4">Filtered Articles</h2>
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArticles.map(article => (
            <ArticleCard key={article.id} id={article.id} title={article.title} content={article.content} isFavorite={favorites.includes(article.id)} />
          ))}
        </div>
      ) : (
        <p className="text-white">No articles found for the selected category.</p>
      )}

      <div className="mt-8 flex justify-center">
        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={newPage => setPage(newPage)} />
      </div>
    </div>
  );
};

export default ArticlesCategorys;
