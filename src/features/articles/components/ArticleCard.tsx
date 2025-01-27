import { useDispatch } from "react-redux";
import { toggleFavorite } from "../reducers/articleReducer";
import { ArticleCardProps } from "../interfaces/article.interfaces";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, content, isFavorite }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/articles/${id}`);
  };

  return (
    <div onClick={handleNavigate} className="border p-4 mb-4 flex flex-col justify-between items-center transition-transform transform hover:scale-105 cursor-pointer">
      <div className="w-full min-h-[70px]">
        <h2 className="text-2xl font-bold text-blue-500">{title}</h2>
      </div>
      <p>{content}</p>
      <button
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          dispatch(toggleFavorite(id));
        }}
        className={`mb-4 mt-2 ${isFavorite ? "bg-red-500" : "bg-blue-500"} text-white`}>
        {isFavorite ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
};

export default ArticleCard;
