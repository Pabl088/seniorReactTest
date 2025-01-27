const BackButton: React.FC = () => {
  return (
    <div className="mt-6">
      <button onClick={() => window.history.back()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go Back
      </button>
    </div>
  );
};

export default BackButton;
