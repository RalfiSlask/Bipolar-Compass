'use client';

import BookCard from '@/app/components/pages/multimedia/books/BookCard';
import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import Spinner from '@/app/components/shared/Spinner';
import { IBook } from '@/app/types/api/googleBookTypes';
import { sortBooksByRating } from '@/app/utils/bookUtils';
import { removeDuplicatesFromArray } from '@/app/utils/generalUtils';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const BASE_URL = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

type SortOption = 'relevance' | 'newest' | 'rating';
type Language = 'en' | 'sv';

const SORT_OPTIONS = [
  { value: 'relevance', label: '📊 Relevans' },
  { value: 'rating', label: '⭐ Betyg' },
  { value: 'newest', label: '🆕 Nyast' },
];

const MAX_RESULTS = 10;
const ITEMS_PER_PAGE = 10;

const BooksSearchPage = () => {
  const searchParams = useSearchParams();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [books, setBooks] = useState<IBook[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [language, setLanguage] = useState<Language>('en');
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
          // Store if we have more results
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

  const handleSearch = () => {
    const userSearchTerm = additionalSearch.trim();
    if (userSearchTerm) {
      setSearchQuery(userSearchTerm);
      setCurrentPage(1);
    }
  };

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
    <section className="w-full min-h-screen flex flex-col items-center bg-primary-light">
      <div className="max-w-[1440px] w-full px-4 md:px-10 pt-4 md:pb-8 md:pt-8">
        <div className="w-full lg:h-[350px] bg-white rounded-lg shadow-md p-4 md:px-10 py-6 flex flex-col lg:flex-row justify-between gap-10">
          <Image
            src="/images/books/books-hero.webp"
            alt="böcker"
            width={6730}
            height={4444}
            quality={80}
            priority={true}
            aria-label="böcker"
            className="w-auto aspect-auto h-full object-cover"
          />
          <div className="max-w-3xl flex flex-col justify-center bg-white">
            <h2 className="text-xl md:text-2xl font-semibold text-primary-dark mb-4">
              Sök bland böcker om bipolaritet
            </h2>
            <p className="text-gray-600 mb-6">
              Ange en sökterm för att hitta böcker om bipolär sjukdom och dess
              olika aspekter.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  name="search"
                  id="search"
                  aria-label="input för att söka böcker"
                  placeholder="Skriv din sökterm här..."
                  className="primary-input !h-12 w-full"
                  value={additionalSearch}
                  onChange={(e) => setAdditionalSearch(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <button
                className="px-8 py-3 bg-primary-dark hover:bg-secondary-dark text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Sök
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Din sökning kommer att kombineras med &quot;bipolar&quot; för att
              hitta relevanta böcker.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] w-full px-4 md:px-10 pb-4 md:pb-8">
        {isInitialLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Spinner />
          </div>
        ) : (
          <>
            {books.length > 0 && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold">
                    Sökresultat för &quot;{searchQuery}&quot;
                  </h1>
                </div>

                <div className="mb-6 flex justify-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm border space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Språk:
                      </label>
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleLanguageChange('en')}
                          disabled={isInitialLoading}
                          className={`px-4 py-2 rounded transition-colors ${
                            language === 'en'
                              ? 'bg-primary-dark text-white'
                              : 'bg-white border border-primary-border text-primary-dark hover:bg-primary-light'
                          } ${
                            isInitialLoading
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                        >
                          🇬🇧 Engelska
                        </button>
                        <button
                          onClick={() => handleLanguageChange('sv')}
                          disabled={isInitialLoading}
                          className={`px-4 py-2 rounded transition-colors ${
                            language === 'sv'
                              ? 'bg-primary-dark text-white'
                              : 'bg-white border border-primary-border text-primary-dark hover:bg-primary-light'
                          } ${
                            isInitialLoading
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                        >
                          🇸🇪 Svenska
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sortera efter:
                      </label>
                      <CustomSelect
                        options={SORT_OPTIONS}
                        value={sortBy}
                        onChange={(value) =>
                          handleSortChange(value as SortOption)
                        }
                        name="sort"
                        size="large"
                      />
                    </div>
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

                {!isInitialLoading && books.length > 0 && (
                  <div className="mt-8">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <button
                        onClick={() => handlePageChange('prev')}
                        disabled={currentPage === 1}
                        className="flex items-center order-1 sm:order-none gap-2 px-4 py-2 rounded-md bg-white border border-primary-border text-primary-dark hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors duration-200"
                      >
                        <IoChevronBack className="text-lg" />
                        <span>Föregående</span>
                      </button>

                      <span className="order-3 w-full text-center sm:text-left sm:w-fit sm:order-none text-primary-dark font-medium">
                        Sida {currentPage}
                      </span>

                      <button
                        onClick={() => handlePageChange('next')}
                        disabled={!hasMoreResults}
                        className="flex items-center order-2 sm:order-none gap-2 px-4 py-2 rounded-md bg-primary-dark text-white hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-medium transition-colors duration-200"
                      >
                        <span>Nästa</span>
                        <IoChevronForward className="text-lg" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {!isInitialLoading && books.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  Inga böcker hittades för din sökning.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BooksSearchPage;
