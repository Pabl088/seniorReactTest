import { useDispatch } from "react-redux";
import { toggleFavorite } from "../reducers/articleReducer";
import { ArticleCardProps } from "../interfaces/article.interfaces";

const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, content, isFavorite }) => {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 mb-4 justify-between items-center">
      <div className="w-full">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p>{content}</p>
      </div>
      <button onClick={() => dispatch(toggleFavorite(id))} className={` mb-4${isFavorite ? "bg-red-500" : "bg-blue-500"} text-white`}>
        {isFavorite ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
};

export default ArticleCard;
