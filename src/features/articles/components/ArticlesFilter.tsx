import { ArticlesFilterProps } from "../interfaces/article.interfaces";

const ArticlesFilter: React.FC<ArticlesFilterProps> = ({ filter, setFilter }) => {
  return <input type="text" placeholder="Search articles..." value={filter} onChange={e => setFilter(e.target.value)} className="mb-4 p-2 border rounded" />;
};

export default ArticlesFilter;
