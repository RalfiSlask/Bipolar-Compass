'use client';

import BookDescription from '@/app/components/pages/multimedia/books/BookDescription';
import BookInfoCategories from '@/app/components/pages/multimedia/books/BookInfoCategories';
import BookInfoImage from '@/app/components/pages/multimedia/books/BookInfoImage';
import BookPurchaseLinks from '@/app/components/pages/multimedia/books/BookPurchaseLinks';
import Spinner from '@/app/components/shared/Spinner';
import NotFound from '@/app/not-found';
import { IBook } from '@/app/types/api/googleBookTypes';
import { renderStarsFromRating, isISBNValid } from '@/app/utils/bookUtils';
import { getLanguageName } from '@/app/utils/localeUtils';
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
        // Get the first matching book
        console.log('bookDetails', response.data.items[0]);
        setBookDetails(response.data.items[0]);
      } else {
        console.log('No book found with ISBN:', isbn);
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
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow p-6">
        {isLoading ? (
          <Spinner />
        ) : bookDetails ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column - Book image */}
            <BookInfoImage
              thumbnail={bookDetails.volumeInfo.imageLinks?.thumbnail || ''}
              alt={bookDetails.volumeInfo.title}
            />

            <div className="md:w-2/3 flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-primary-dark">
                  {bookDetails.volumeInfo?.title}
                </h2>
                {bookDetails.volumeInfo?.authors && (
                  <p className="text-gray-600">
                    {bookDetails.volumeInfo.authors.join(', ')}
                  </p>
                )}
              </div>

              {bookDetails.volumeInfo?.averageRating && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStarsFromRating(
                      bookDetails.volumeInfo.averageRating
                    )}
                  </div>
                  <span className="text-gray-600">
                    {bookDetails.volumeInfo.averageRating.toFixed(1)}
                    {bookDetails.volumeInfo.ratingsCount && (
                      <span className="ml-1">
                        ({bookDetails.volumeInfo.ratingsCount} betyg)
                      </span>
                    )}
                  </span>
                </div>
              )}

              {/* ISBN */}
              <div>
                <h3 className="font-medium mb-1">ISBN</h3>
                <p className="text-gray-600">{isbn}</p>
              </div>

              {/* Pages */}

              <p>Sidor {bookDetails.volumeInfo.pageCount}</p>

              {/* Published date */}
              <p>Publicerad: {bookDetails.volumeInfo.publishedDate}</p>

              {/* Publisher */}
              <p>Förlag: {bookDetails.volumeInfo.publisher}</p>

              {/* Language */}
              <p>
                Språk: {getLanguageName(bookDetails.volumeInfo.language || '')}
              </p>

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
