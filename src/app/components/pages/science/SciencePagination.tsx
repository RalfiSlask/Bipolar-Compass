interface SciencePaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: 'prev' | 'next') => void;
}

const SciencePagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: SciencePaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => handlePageChange('prev')}
        disabled={currentPage === 1}
        className="primary-button"
      >
        Föregående
      </button>

      <span className="text-gray-700">
        Sida {currentPage} av {totalPages}
      </span>

      <button
        onClick={() => handlePageChange('next')}
        disabled={currentPage === totalPages}
        className="secondary-button"
      >
        Nästa
      </button>
    </div>
  );
};

export default SciencePagination;
