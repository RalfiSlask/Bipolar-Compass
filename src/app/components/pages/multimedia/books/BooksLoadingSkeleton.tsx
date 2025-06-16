'use client';

const BooksLoadingSkeleton = () => {
  const booksPlaceholderRows = [1, 2, 3];

  return (
    <div className="flex flex-col gap-6">
      {booksPlaceholderRows.map((i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-6 animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {booksPlaceholderRows.map((rowIndex) => (
              <div
                key={rowIndex}
                className="bg-white rounded-lg p-4 shadow-sm border min-w-[300px] xl:max-h-[150px] w-full"
              >
                <div className="flex gap-3">
                  <div
                    className="w-16 h-20 bg-gray-300 rounded flex-shrink-0"
                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                  ></div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksLoadingSkeleton;
