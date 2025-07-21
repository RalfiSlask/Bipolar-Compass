'use client';

import BookDescription from '@/app/components/pages/multimedia/books/BookDescription';
import BookInfo from '@/app/components/pages/multimedia/books/BookInfo';
import BookInfoCategories from '@/app/components/pages/multimedia/books/BookInfoCategories';
import BookInfoImage from '@/app/components/pages/multimedia/books/BookInfoImage';
import BookPurchaseLinks from '@/app/components/pages/multimedia/books/BookPurchaseLinks';
import BookRatings from '@/app/components/pages/multimedia/books/BookRatings';
import BookDetailsSkeleton from '@/app/components/pages/multimedia/books/skeletons/BookDetailsSkeleton';
import Spinner from '@/app/components/shared/Spinner';
import NotFound from '@/app/not-found';
import { IBook } from '@/app/types/api/googleBookTypes';
import { isISBNValid } from '@/app/utils/bookUtils';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

const BookPage = () => {
  const params = useParams();
  const isbn = params?.isbn as string;
  const [bookDetails, setBookDetails] = useState<IBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookDetails = async () => {
    try {
      const apiUrl = `${BASE_URL}/volumes?q=isbn:${isbn}&key=${API_KEY}`;
      console.log('Searching for ISBN:', isbn);
      const response = await axios.get(apiUrl);

      if (response.data.items && response.data.items.length > 0) {
        console.log('bookDetails', response.data.items[0]);
        setBookDetails(response.data.items[0]);
      } else {
        setBookDetails(null);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      setBookDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [isbn]);

  useEffect(() => {
    console.log('book details: ', bookDetails);
  }, [bookDetails]);

  const isValidISBN = isISBNValid(isbn);

  if (!isValidISBN) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto sm:px-6 sm:py-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        {isLoading ? (
          <>
            <div className="lightbox-loading-container">
              <Spinner />
            </div>
            <BookDetailsSkeleton />
          </>
        ) : bookDetails ? (
          <div className="flex flex-col md:flex-row gap-6">
            <BookInfoImage
              thumbnail={bookDetails.volumeInfo.imageLinks?.thumbnail || ''}
              alt={bookDetails.volumeInfo.title}
            />
            <div className="md:w-2/3 xl:w-3/4 flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-primary-dark">
                  {bookDetails.volumeInfo?.title}
                </h2>
                {bookDetails.volumeInfo?.authors && (
                  <p className="text-sm">
                    av{' '}
                    <span className="text-primary-dark font-medium">
                      {bookDetails.volumeInfo.authors.join(', ')}
                    </span>
                  </p>
                )}
                <BookRatings volumeInfo={bookDetails.volumeInfo} />
              </div>
              <BookInfo volumeInfo={bookDetails.volumeInfo} isbn={isbn} />
              {bookDetails.volumeInfo?.categories && (
                <BookInfoCategories
                  categories={bookDetails.volumeInfo.categories}
                />
              )}

              {bookDetails.volumeInfo?.description && (
                <BookDescription
                  description={bookDetails.volumeInfo.description}
                />
              )}
              <BookPurchaseLinks book={bookDetails} isbn={isbn} />
            </div>
          </div>
        ) : (
          <p>
            Inga detaljer om denna bok hittades, testa att söka på en annan bok.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookPage;
