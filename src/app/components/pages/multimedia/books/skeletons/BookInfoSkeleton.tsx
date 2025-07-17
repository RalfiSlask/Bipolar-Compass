const BookInfoSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row max-w-2xl lg:justify-between border border-primary-dark/30 p-4">
      <div>
        <div className="book-info-container">
          <div>
            <div className="h-6 w-12 mb-1 skeleton-pulse"></div>
            <p className="h-6 w-32 skeleton-pulse"></p>
          </div>
          <div>
            <div className="h-6 w-12 mb-1 skeleton-pulse"></div>
            <p className="h-6 w-10 skeleton-pulse"></p>
          </div>
          <div>
            <div className="h-6 w-16 mb-1 skeleton-pulse"></div>
            <p className="h-6 w-24 skeleton-pulse"></p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block border-l border-primary-dark/30 w-[1px] h-full"></div>
      <div className="lg:ml-4 book-info-container">
        <div>
          <div className="h-6 w-16 mb-1 skeleton-pulse"></div>
          <p className="h-6 w-24 skeleton-pulse"></p>
        </div>
        <div>
          <div className="h-6 w-12 mb-1 skeleton-pulse"></div>
          <p className="h-6 w-20 skeleton-pulse"></p>
        </div>
      </div>
    </div>
  );
};

export default BookInfoSkeleton;
