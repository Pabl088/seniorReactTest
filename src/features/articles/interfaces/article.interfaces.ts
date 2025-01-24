export interface Article {
  id: number;
  title: string;
  content: string;
  rating: number;
  isFavorite: boolean;
  category: string;
  subCategory: string;
  author: string;
  createdAt: string;
}

export interface ArticlesState {
  articles: Article[];
  favorites: number[];
}
