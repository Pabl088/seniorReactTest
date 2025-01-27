import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateArticleRating } from "../reducers/articleReducer";
import { RootState } from "../../../global-store/store";

const ArticleRating: React.FC<{ id: number; rating: number }> = ({ id, rating }) => {
  const dispatch = useDispatch();

  const actualRating = useSelector((state: RootState) => state.articlesStore.articles.find(article => article.id === id)?.rating || 0);

  const handleRatingClick = (newRating: number) => {
    dispatch(
      updateArticleRating({
        id,
        rating: newRating,
      })
    );
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center space-x-1">
      {stars.map(star => (
        <button
          key={star}
          onClick={() => handleRatingClick(star)}
          className={`w-3 h-6 flex items-center justify-center rounded-full border transition-all duration-200 ${
            star <= actualRating ? "bg-yellow-400 border-yellow-500" : "bg-gray-200 border-gray-300"
          } hover:bg-yellow-300`}
          aria-label={`Rate ${star} stars`}>
          <span className="text-xs font-bold text-black">{star <= rating ? "★" : "☆"}</span>
        </button>
      ))}
    </div>
  );
};

export default ArticleRating;
