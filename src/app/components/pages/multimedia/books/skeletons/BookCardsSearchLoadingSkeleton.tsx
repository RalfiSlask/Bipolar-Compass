'use client';

const BookCardsSearchLoadingSkeleton = () => {
  const booksPlaceholders = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {booksPlaceholders.map((index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-4 shadow-sm border animate-pulse"
        >
          <div className="flex flex-col gap-3">
            <div
              className="relative w-full aspect-[2/3] bg-gray-300 rounded flex-shrink-0"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
            ></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCardsSearchLoadingSkeleton;
