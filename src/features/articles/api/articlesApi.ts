import { useQuery } from "react-query";
import { Article } from "../interfaces/article.interfaces";

const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch("https://run.mocky.io/v3/8266cc19-e1de-4c89-8e21-840eed75e4a6");
  return response.json();
};

export const useArticles = () => useQuery("articles", fetchArticles);
