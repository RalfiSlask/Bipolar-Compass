'use client';

import BookPurchaseLinks from '@/app/components/pages/multimedia/books/BookPurchaseLinks';
import NotFound from '@/app/not-found';
import { IBook } from '@/app/types/api/googleBookTypes';
import {
  getSwedishCategoryLabel,
  renderStarsFromRating,
} from '@/app/utils/bookUtils';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

const BookPage = () => {
  const params = useParams();
  const isbn = params?.isbn as string;
  const [bookDetails, setBookDetails] = useState<IBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch book details from Google Books API
  const fetchBookDetails = async () => {
    try {
      // Use q=isbn: parameter to search for a specific ISBN
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

  // Check if the ISBN is valid (13 digits). If not, return not found
  const isValidISBN = /^\d{13}$/.test(isbn || '');

  if (!isValidISBN) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Bokdetaljer</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {isLoading ? (
          <p>Laddar...</p>
        ) : bookDetails ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column - Book image */}
            <div className="md:w-1/3">
              {bookDetails.volumeInfo?.imageLinks?.thumbnail ? (
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={bookDetails.volumeInfo.imageLinks.thumbnail}
                    alt={bookDetails.volumeInfo.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Ingen bild tillgänglig</span>
                </div>
              )}
            </div>

            <div className="md:w-2/3 flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {bookDetails.volumeInfo?.title}
                </h2>
                {bookDetails.volumeInfo?.authors && (
                  <p className="text-gray-600">
                    Av {bookDetails.volumeInfo.authors.join(', ')}
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

              {bookDetails.volumeInfo?.categories && (
                <div>
                  <h3 className="font-medium mb-2">Kategorier</h3>
                  <div className="flex flex-wrap gap-2">
                    {bookDetails.volumeInfo.categories.map(
                      (category, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {getSwedishCategoryLabel(category)}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {bookDetails.volumeInfo?.description && (
                <div>
                  <h3 className="font-medium mb-2">Beskrivning</h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {bookDetails.volumeInfo.description.replace(/<[^>]*>/g, '')}
                  </p>
                </div>
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
