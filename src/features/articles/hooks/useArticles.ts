import { useQuery } from "react-query";
import { fetchArticles } from "../api/articlesApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../global-store/store";
import { Article } from "../interfaces/article.interfaces";
import { setArticles } from "../reducers/articleReducer";
import { useEffect } from "react";

export const useArticles: () => { isLoading: boolean } = () => {
  const articles: Article[] = useSelector((state: RootState) => state.articlesStore.articles);
  const dispatch = useDispatch();

  const queryResult = useQuery("articles", fetchArticles, {
    enabled: articles.length === 0,
  });

  useEffect(() => {
    if (queryResult.data && articles.length === 0) {
      dispatch(setArticles(queryResult.data));
    }
  }, [queryResult.data, articles.length, dispatch]);

  return { isLoading: queryResult.isLoading };
};
