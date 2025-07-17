'use client';

import BookDescriptionSkeleton from './BookDescriptionSkeleton';
import BookInfoCategoriesSkeleton from './BookInfoCategoriesSkeleton';
import BookInfoImageSkeleton from './BookInfoImageSkeleton';
import BookInfoSkeleton from './BookInfoSkeleton';
import BookPurchaseLinksSkeleton from './BookPurchaseLinksSkeleton';
import TitleAuthorsSkeleton from './TitleAuthorsSkeleton';

const BookDetailsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <BookInfoImageSkeleton />
      <div className="md:w-2/3 flex flex-col gap-4">
        <TitleAuthorsSkeleton />
        <BookInfoSkeleton />
        <BookInfoCategoriesSkeleton />
        <BookDescriptionSkeleton />
        <BookPurchaseLinksSkeleton />
      </div>
    </div>
  );
};

export default BookDetailsSkeleton;
