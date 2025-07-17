'use client';

const BookSearchFilterSkeleton = () => {
  return (
    <div className="mb-6 flex justify-center">
      <div className="bg-white rounded-lg p-4 shadow-md border flex flex-col sm:flex-row gap-4 sm:w-[500px]">
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-2">
            Språk:
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 h-10 skeleton-pulse w-[102px]"></div>
            <div className="px-4 py-2 h-10 skeleton-pulse w-[96px]"></div>
          </div>
        </div>

        <div className="w-full">
          <div className="block text-sm font-medium text-gray-700 mb-2">
            Sortera efter:
          </div>
          <div className="px-4 py-2 h-10 skeleton-pulse w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default BookSearchFilterSkeleton;
