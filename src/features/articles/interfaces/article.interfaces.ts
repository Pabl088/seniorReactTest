export interface Article {
  id: number;
  title: string;
  content: string;
  rating: number;
  category: string;
  subCategory: string;
  author: string;
  createdAt: string;
}

export interface ArticlesState {
  articles: Article[];
  favorites: number[];
  filter: string;
  page: number;
}

export interface ArticleCardProps {
  id: number;
  title: string;
  content: string;
  isFavorite: boolean;
}

export interface ArticlesFilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export interface LexicalEditorProps {
  article: Article;
}
