import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const CarouselChevrons = ({
  scrollPrev,
  scrollNext,
}: {
  scrollPrev: () => void;
  scrollNext: () => void;
}) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={scrollPrev}
        className="p-2 rounded-full hover:bg-primary-dark transition-colors hover:text-white"
        aria-label="Previous books"
      >
        <IoChevronBack className="w-5 h-5 " />
      </button>
      <button
        onClick={scrollNext}
        className="p-2 rounded-full hover:bg-primary-dark transition-colors hover:text-white"
        aria-label="Next books"
      >
        <IoChevronForward className="w-5 h-5 " />
      </button>
    </div>
  );
};

export default CarouselChevrons;
