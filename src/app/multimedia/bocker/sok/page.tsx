'use client';

import BookCard from '@/app/components/pages/multimedia/books/BookCard';
import BookPagination from '@/app/components/pages/multimedia/books/BookPagination';
import BookSorting from '@/app/components/pages/multimedia/books/BookSorting';
import BooksSearchContainer from '@/app/components/pages/multimedia/books/BooksSearchContainer';
import LanguageSwitcher from '@/app/components/pages/multimedia/books/LanguageSwitcher';
import SearchNoResults from '@/app/components/pages/multimedia/books/SearchNoResults';
import BookCardsSearchLoadingSkeleton from '@/app/components/pages/multimedia/books/skeletons/BookCardsSearchLoadingSkeleton';
import BookSearchFilterSkeleton from '@/app/components/pages/multimedia/books/skeletons/BookSearchFilterSkeleton';
import Spinner from '@/app/components/shared/Spinner';
import { IBook } from '@/app/types/api/googleBookTypes';
import { Language } from '@/app/types/languages';
import { SortOption } from '@/app/types/multimedia/books/sort';
import { sortBooksByRating } from '@/app/utils/bookUtils';
import { removeDuplicatesFromArray } from '@/app/utils/generalUtils';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

const MAX_RESULTS = 10;
const ITEMS_PER_PAGE = 10;

const BooksSearchPage = () => {
  const searchParams = useSearchParams();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [books, setBooks] = useState<IBook[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [language, setLanguage] = useState<Language>('sv');
  const [searchQuery, setSearchQuery] = useState('');
  const [additionalSearch, setAdditionalSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(true);

  // Helper function to build the API URL
  const buildApiUrl = (
    searchQuery: string,
    orderBy: SortOption,
    lang: Language,
    startIndex: number
  ): string => {
    let apiUrl = `${BASE_URL}/volumes?q=${encodeURIComponent(
      searchQuery
    )}&langRestrict=${lang}&maxResults=${MAX_RESULTS}&startIndex=${startIndex}&printType=books`;

    if (orderBy !== 'rating') {
      apiUrl += `&orderBy=${orderBy}`;
    }

    apiUrl += `&key=${API_KEY}`;
    return apiUrl;
  };

  const searchBooks = useCallback(
    async (
      query: string,
      orderBy: SortOption = 'relevance',
      lang: Language = 'en',
      page: number = 1
    ) => {
      setIsInitialLoading(true);
      try {
        const specificTerm = lang === 'sv' ? 'bipolär' : 'bipolar';
        const searchQuery = `(intitle:${specificTerm} OR "${specificTerm}") AND ${query}`;
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const apiUrl = buildApiUrl(searchQuery, orderBy, lang, startIndex);
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data?.items) {
          let results = [...data.items];

          if (orderBy === 'rating') {
            results = sortBooksByRating(results);
          }

          const uniqueBooks = removeDuplicatesFromArray<IBook>(results);
          setBooks(uniqueBooks);
          setHasMoreResults(results.length === ITEMS_PER_PAGE);
        } else {
          setBooks([]);
          setHasMoreResults(false);
        }
      } catch (error) {
        console.error('Error searching books:', error);
        setBooks([]);
        setHasMoreResults(false);
      } finally {
        setIsInitialLoading(false);
      }
    },
    []
  );

  const handleSortChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
    if (searchQuery) {
      searchBooks(searchQuery, newSortBy, language, currentPage);
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (searchQuery) {
      searchBooks(searchQuery, sortBy, newLanguage, currentPage);
    }
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!searchParams) return;
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      setAdditionalSearch(query);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery) {
      searchBooks(searchQuery, sortBy, language, currentPage);
    }
  }, [searchQuery, searchBooks, sortBy, language, currentPage]);

  return (
    <>
      {isInitialLoading && (
        <div className="lightbox-loading-container">
          <Spinner />
        </div>
      )}
      <section className="w-full min-h-screen flex flex-col items-center bg-primary-light">
        <div className="max-w-[1440px] w-full px-4 md:px-10 pt-4 md:pt-8">
          <BooksSearchContainer
            searchQuery={additionalSearch}
            setSearchQuery={setAdditionalSearch}
            onSubmit={(query) => {
              setSearchQuery(query);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="max-w-[1440px] w-full px-4 md:px-10 pb-4 md:pb-8">
          {isInitialLoading ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">
                  Sökresultat för &quot;{searchQuery}&quot;
                </h1>
              </div>
              <BookSearchFilterSkeleton />
              <BookCardsSearchLoadingSkeleton />
            </>
          ) : (
            <>
              {books.length > 0 && (
                <>
                  <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">
                      Sökresultat för &quot;{searchQuery}&quot;
                    </h1>
                  </div>

                  <div className="mb-6 flex justify-center">
                    <div className="bg-white rounded-lg p-4 shadow-md border flex flex-col sm:flex-row gap-4">
                      <LanguageSwitcher
                        language={language}
                        handleLanguageChange={handleLanguageChange}
                        isInitialLoading={isInitialLoading}
                      />
                      <BookSorting
                        sortBy={sortBy}
                        handleSortChange={handleSortChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {books.map((book, index) => (
                      <BookCard
                        key={book.id || index}
                        book={book}
                        categoryId={0}
                        categoryName="search"
                        bookIndex={index}
                        language={language}
                      />
                    ))}
                  </div>

                  {books.length > 0 && (
                    <BookPagination
                      currentPage={currentPage}
                      handlePageChange={handlePageChange}
                      hasMoreResults={hasMoreResults}
                    />
                  )}
                </>
              )}

              {books.length === 0 && <SearchNoResults />}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default BooksSearchPage;
