import React from "react";
import { useArticles } from "../api/articlesApi";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../reducers/articleReducer";

const ArticlesList: React.FC = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useArticles();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      {data?.map(article => (
        <div key={article.id} className="border p-4 rounded mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p>{article.content}</p>
          </div>
          <button onClick={() => dispatch(toggleFavorite(article.id))} className="bg-blue-500 text-white px-4 py-2 rounded">
            Toggle Favorite
          </button>
        </div>
      ))}
    </div>
  );
};

export default ArticlesList;
