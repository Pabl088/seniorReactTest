import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../features/articles/reducers/articleReducer";

export const store = configureStore({
  reducer: {
    articlesStore: articlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
