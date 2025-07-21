'use client';

import { IBook } from '@/app/types/api/googleBookTypes';
import {
  getBookTitleAsSlug,
  getISBNFromIdentifiers,
} from '@/app/utils/bookUtils';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import BookCardImage from './BookCardImage';

interface IBookCardProps {
  book: IBook;
  categoryId: number;
  categoryName: string;
  bookIndex: number;
}

// Memoized BookCard component to prevent unnecessary re-renders
const BookCard = memo(
  ({ book, categoryId, categoryName, bookIndex }: IBookCardProps) => {
    const router = useRouter();
    const isbn = getISBNFromIdentifiers(book.volumeInfo.industryIdentifiers);

    const { volumeInfo } = book;
    const bookTitleAsSlug = getBookTitleAsSlug(volumeInfo.title);

    const handleBookClick = () => {
      if (isbn) {
        const encodedTitle = encodeURIComponent(volumeInfo.title);
        router.push(
          `/multimedia/bocker/${bookTitleAsSlug}/${isbn}?title=${encodedTitle}`
        );
      }
    };

    return (
      <div
        key={`${categoryId}-${categoryName}-${
          book.id || `idx-${bookIndex}`
        }-${bookIndex}`}
        className="bg-white rounded-lg p-4 shadow-sm border transition-all hover:shadow-md cursor-pointer group"
        style={{ perspective: '600px' }}
        onClick={handleBookClick}
      >
        <div className="flex flex-col gap-3">
          {volumeInfo.imageLinks?.thumbnail && (
            <BookCardImage volumeInfo={volumeInfo} />
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
              {volumeInfo.title}
            </h3>
            {volumeInfo.authors && (
              <p className="text-xs text-gray-500">
                {volumeInfo.authors[0]}
                {volumeInfo.authors.length > 1 && ', ...'}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

// When we use memo, we give it a name so that we can see it in the React Dev Tools
BookCard.displayName = 'BookCard';

export default BookCard;
