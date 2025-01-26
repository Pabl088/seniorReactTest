import { Routes, Route, Navigate } from "react-router-dom";
import ArticlesList from "./features/articles/pages/ArticlesList";
import ArticleDetail from "./features/articles/pages/ArticleDetail";
import "./App.css";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/articles" replace />} />
    <Route path="/articles" element={<ArticlesList />} />
    <Route path="/articles/:id" element={<ArticleDetail />} />
  </Routes>
);

export default App;
