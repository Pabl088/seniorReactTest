import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-6">
      <button onClick={() => navigate("/articles")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go Back
      </button>
    </div>
  );
};

export default BackButton;
