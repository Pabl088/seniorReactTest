import { useQuery } from "react-query";
import { fetchArticles } from "../api/articlesApi";

export const useArticles = () => useQuery("articles", fetchArticles);
