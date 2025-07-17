const BookInfoImageSkeleton = () => {
  return (
    <div className="sm:w-1/3 xl:w-1/4">
      <div className="w-full flex justify-center max-w-80">
        <div className="w-full aspect-[3/4] flex items-center justify-center animate-pulse">
          <div className="w-full h-full bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default BookInfoImageSkeleton;
