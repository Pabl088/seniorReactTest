import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Article } from "../interfaces/article.interfaces";
import { setArticles } from "../reducers/articleReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../global-store/store";
import { useNavigate } from "react-router-dom";

const ArticuleCreate: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const articles = useSelector((state: RootState) => state.articlesStore.articles);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    subCategory: "",
    author: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newArticle: Article = {
      id: articles.length > 0 ? Math.max(...articles.map(article => article.id)) + 1 : 1,
      title: form.title,
      content: form.content,
      category: form.category,
      subCategory: form.subCategory,
      author: form.author,
      createdAt: new Date().toISOString(),
      rating: 0,
    };

    dispatch(setArticles([...articles, newArticle]));

    navigate("/articles");
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">Create New Article</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4 max-w-lg mx-auto">
          <label htmlFor="title" className="block text-white font-bold mb-2">
            Title
          </label>
          <input type="text" id="title" name="title" value={form.title} onChange={handleInputChange} className="w-full p-2 rounded bg-gray-900 text-white" required />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-white font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-900 text-white"
            rows={13}
            cols={100}
            required></textarea>
        </div>

        <div className="mb-4 max-w-lg mx-auto">
          <label htmlFor="category" className="block text-white font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-900 text-white"
            required
          />
        </div>

        <div className="mb-4 max-w-lg mx-auto">
          <label htmlFor="subCategory" className="block text-white font-bold mb-2">
            Subcategory
          </label>
          <input
            type="text"
            id="subCategory"
            name="subCategory"
            value={form.subCategory}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-900 text-white"
          />
        </div>

        <div className="mb-4 max-w-lg mx-auto">
          <label htmlFor="author" className="block text-white font-bold mb-2">
            Author
          </label>
          <input type="text" id="author" name="author" value={form.author} onChange={handleInputChange} className="w-full p-2 rounded bg-gray-900 text-white" required />
        </div>

        <div className="flex flex-col-reverse items-center gap-2 sm:flex-row sm:justify-center">
          <button onClick={() => navigate("/articles")} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 max-w-fit">
            Cancel
          </button>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 max-w-fit">
            Create Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticuleCreate;
