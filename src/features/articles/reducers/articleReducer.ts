import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article, ArticlesState } from "../interfaces/article.interfaces";

const initialState: ArticlesState = {
  articles: [],
  favorites: [],
};

const articlesSlice = createSlice({
  name: "articles",
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
  },
});

export const { setArticles, toggleFavorite } = articlesSlice.actions;
export default articlesSlice.reducer;
