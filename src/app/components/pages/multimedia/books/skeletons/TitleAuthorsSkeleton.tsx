const TitleAuthorsSkeleton = () => {
  return (
    <div>
      <div className="h-8 w-2/3 mb-2 skeleton-pulse"></div>
      <div className="h-4 w-1/3 mb-2 skeleton-pulse"></div>
      <div className="flex items-center gap-2">
        <div className="flex">
          <div className="w-24 h-6 skeleton-pulse"></div>
        </div>
        <span className="h-4 w-10 skeleton-pulse"></span>
      </div>
    </div>
  );
};

export default TitleAuthorsSkeleton;
