import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ArticlesList from "./features/articles/components/ArticlesList";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/articles" replace />} />
    <Route path="/articles" element={<ArticlesList />} />
  </Routes>
);

export default App;
