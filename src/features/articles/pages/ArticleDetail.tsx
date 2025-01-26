import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../global-store/store";

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = useSelector((state: RootState) => state.articles.articles.find(article => article.id === Number(id)));

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Article not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{article.title}</h1>
        <p className="text-gray-500 mt-2">By {article.author}</p>
      </header>

      <section className="prose max-w-none text-gray-700">
        <p>{article.content}</p>
      </section>

      <div className="mt-6">
        <button onClick={() => window.history.back()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;
