import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article, ArticlesState } from "../interfaces/article.interfaces";

const initialState: ArticlesState = {
  articles: [],
  favorites: [],
  filter: "",
  page: 1,
};

const articlesSlice = createSlice({
  name: "articlesState",
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<Article[]>) {
      state.articles = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    updateArticleTitle(state, action: PayloadAction<{ id: number; title: string }>) {
      const { id, title } = action.payload;
      state.articles = state.articles.map(article => (article.id === id ? { ...article, title } : article));
    },
    updateArticleContent(state, action: PayloadAction<{ id: number; content: string }>) {
      const { id, content } = action.payload;
      state.articles = state.articles.map(article => (article.id === id ? { ...article, content } : article));
    },
  },
});

export const { setArticles, toggleFavorite, setFilter, setPage, updateArticleTitle, updateArticleContent } = articlesSlice.actions;
export default articlesSlice.reducer;
