const BookInfoCategoriesSkeleton = () => {
  return (
    <div>
      <div className="h-6 w-32 mb-2 skeleton-pulse"></div>
      <div className="flex flex-wrap gap-2">
        <div className=" px-6 py-2 w-24 h-7 skeleton-pulse"></div>
        <div className="px-6 py-2 w-20 h-7 skeleton-pulse"></div>
        <div className="px-6 py-2 w-28 h-7 skeleton-pulse"></div>
      </div>
    </div>
  );
};

export default BookInfoCategoriesSkeleton;
