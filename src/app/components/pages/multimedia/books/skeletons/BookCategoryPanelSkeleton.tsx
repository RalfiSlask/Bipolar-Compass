const BookCategoryPanelSkeleton = () => {
  return (
    <div className="flex items-center flex-col sm:flex-row gap-4 sm:gap-0 justify-between mb-4 border-b border-primary-dark/30 pb-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="h-8 skeleton-pulse w-48"></div>
        <div className="h-6 skeleton-pulse w-16"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-8 h-8 skeleton-pulse"></div>
        <div className="w-8 h-8 skeleton-pulse"></div>
      </div>
    </div>
  );
};

export default BookCategoryPanelSkeleton;
