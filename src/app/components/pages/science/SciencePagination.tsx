import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

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
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button
        onClick={() => handlePageChange('prev')}
        disabled={currentPage === 1}
        className="flex items-center order-1 sm:order-none gap-2 px-4 py-2 rounded-md bg-white border border-primary-border text-primary-dark hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors duration-200"
      >
        <IoChevronBack className="text-lg" />
        <span>Föregående</span>
      </button>

      <span className="order-3 w-full text-center sm:text-left sm:w-fit sm:order-none text-primary-dark font-medium">
        Sida {currentPage} av {totalPages}
      </span>

      <button
        onClick={() => handlePageChange('next')}
        disabled={currentPage === totalPages}
        className="flex items-center order-2 sm:order-none gap-2 px-4 py-2 rounded-md bg-primary-dark text-white hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-medium transition-colors duration-200"
      >
        <span>Nästa</span>
        <IoChevronForward className="text-lg" />
      </button>
    </div>
  );
};

export default SciencePagination;
