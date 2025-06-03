import { FaArrowUp } from 'react-icons/fa';

interface IScrollToTopProps {
  scrollToTop: () => void;
}

const ScrollToTop = ({ scrollToTop }: IScrollToTopProps) => {
  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 
    bg-primary-dark hover:bg-primary-medium text-white 
    p-2 sm:p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl
    transition-all duration-300 animate-bounce z-50"
      aria-label="Tillbaka till toppen"
    >
      <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
    </button>
  );
};

export default ScrollToTop;
