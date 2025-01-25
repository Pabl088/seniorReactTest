import { Article } from "../interfaces/article.interfaces";

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch("https://run.mocky.io/v3/685b9296-9227-4759-b21a-6227c8848332");
  return response.json();
};
