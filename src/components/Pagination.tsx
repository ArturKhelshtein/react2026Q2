import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination">
      <button
        type="button"
        className="button"
        disabled={currentPage <= 1}
        onClick={() => {
            onPageChange(currentPage + 1);
          }}
      >
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        className="button"
        disabled={currentPage >= totalPages}
        onClick={() => {
            onPageChange(currentPage + 1);
          }}
      >
        Next
      </button>
    </nav>
  );
}
