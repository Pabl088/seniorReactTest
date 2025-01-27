import { Routes, Route, Navigate } from "react-router-dom";
import ArticlesList from "./features/articles/pages/ArticlesList";
import ArticleDetail from "./features/articles/pages/ArticleDetail";
import ArticuleCreate from "./features/articles/pages/ArticuleCreate";
import ArticlesCategories from "./features/articles/pages/ArticlesCategories";
import "./App.css";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/articles" replace />} />
    <Route path="/articles" element={<ArticlesList />} />
    <Route path="/articles/:id" element={<ArticleDetail />} />
    <Route path="/articles/create" element={<ArticuleCreate />} />
    <Route path="/articles/categories" element={<ArticlesCategories />} />
    <Route path="*" element={<Navigate to="/articles" replace />} />
  </Routes>
);

export default App;
