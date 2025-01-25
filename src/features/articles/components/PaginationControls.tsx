import { PaginationControlsProps } from "../interfaces/article.interfaces";

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between mt-4">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
