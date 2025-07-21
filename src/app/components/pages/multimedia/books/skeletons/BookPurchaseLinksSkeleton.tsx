const BookPurchaseLinksSkeleton = () => {
  const purchaseLinks = Array.from({ length: 4 }, (_, index) => index + 1);
  const purchaseLinksClasses =
    'inline-flex items-center gap-1 px-4 py-1 border w-32 h-8 skeleton-pulse';
  return (
    <div>
      <div className="h-6 w-20 mb-2 skeleton-pulse"></div>
      <div className="flex flex-wrap gap-3">
        {purchaseLinks.map((link) => (
          <div key={link} className={purchaseLinksClasses}></div>
        ))}
      </div>
    </div>
  );
};

export default BookPurchaseLinksSkeleton;
