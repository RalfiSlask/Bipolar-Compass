const BookDescriptionSkeleton = () => {
  const descriptionLines = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <div className="border-t border-primary-dark/30 pt-4">
      <div className="h-6 w-32 mb-2 skeleton-pulse"></div>
      {descriptionLines.map((line) => (
        <div key={line} className="h-4 w-full mb-2 skeleton-pulse"></div>
      ))}
    </div>
  );
};

export default BookDescriptionSkeleton;
