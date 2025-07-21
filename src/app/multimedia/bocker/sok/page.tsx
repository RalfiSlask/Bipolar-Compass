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
import { ITEMS_PER_PAGE } from '@/app/data/multimedia/books';
import useBookSearchByLanguage from '@/app/hooks/useBookSearchByLanguage';
import { IBook, Language } from '@/app/types/api/googleBookTypes';
import { SortOption } from '@/app/types/multimedia/books/sort';
import { removeDuplicateBooks } from '@/app/utils/bookUtils';
import { getLowerCaseStringsFromArray } from '@/app/utils/generalUtils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';

// Separate component that uses useSearchParams
const BooksSearchContent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [books, setBooks] = useState<IBook[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [language, setLanguage] = useState<Language>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const { searchBooksByLanguage } = useBookSearchByLanguage();
  const router = useRouter();

  const searchBooks = useCallback(
    async (
      query: string,
      orderBy: SortOption = 'relevance',
      lang: Language = 'en',
      page: number = 1
    ) => {
      setIsInitialLoading(true);
      try {
        if (lang === 'all') {
          // For 'all' language, make two separate API calls and combine results
          const swedishResult = await searchBooksByLanguage(
            query,
            orderBy,
            'sv',
            page
          );
          const englishResult = await searchBooksByLanguage(
            query,
            orderBy,
            'en',
            page
          );

          // Combine results with Swedish books first, then English books
          const combinedBooks = [...swedishResult, ...englishResult];
          const uniqueBooks = removeDuplicateBooks(combinedBooks);

          setBooks(uniqueBooks);
          setHasMoreResults(
            swedishResult.length === ITEMS_PER_PAGE ||
              englishResult.length === ITEMS_PER_PAGE
          );
        } else {
          // For specific language, use single API call
          const results = await searchBooksByLanguage(
            query,
            orderBy,
            lang,
            page
          );
          setBooks(results);
          setHasMoreResults(results.length === ITEMS_PER_PAGE);
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
    setCurrentPage(1);
    if (searchQuery) {
      searchBooks(searchQuery, newSortBy, language, 1);
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCurrentPage(1);
    if (searchQuery) {
      searchBooks(searchQuery, sortBy, newLanguage, 1);
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
      setLocalSearchQuery(query);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery) {
      searchBooks(searchQuery, sortBy, language, currentPage);
    }
  }, [searchQuery, searchBooks, sortBy, language, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = localSearchQuery.trim();
    if (trimmedQuery && pathname) {
      router.push(`${pathname}?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center">
      <div className="max-w-[1440px] w-full px-4 md:px-10 pt-4 md:pt-8">
        <BooksSearchContainer
          searchQuery={localSearchQuery}
          setSearchQuery={setLocalSearchQuery}
          handleSearch={handleSearch}
          searchText='Din sökning kommer att kombineras med "bipolar" för att
            hitta relevanta böcker.'
        />
      </div>

      <div className="max-w-[1440px] w-full px-4 md:px-10 pb-4 md:pb-8">
        {isInitialLoading ? (
          <div className="relative">
            <div className="lightbox-loading-container">
              <Spinner />
            </div>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">
                Sökresultat för &quot;{searchQuery}&quot;
              </h1>
            </div>
            <BookSearchFilterSkeleton />
            <BookCardsSearchLoadingSkeleton />
          </div>
        ) : (
          <>
            {books.length > 0 && (
              <>
                <div className="text-center mb-4 sm:mb-6">
                  <h1 className="text-3xl font-bold">
                    Sökresultat för &quot;{searchQuery}&quot;
                  </h1>
                </div>
                <div className="mb-4 sm:mb-6 flex justify-center">
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
                  {books.map((book, index) => {
                    // Create a unique key based on title and authors
                    const title =
                      book.volumeInfo.title?.toLowerCase().trim() || '';
                    const authors = getLowerCaseStringsFromArray(
                      book.volumeInfo.authors || []
                    );
                    const uniqueKey = `${title}|${authors}|${index}`;

                    return (
                      <BookCard
                        key={uniqueKey}
                        book={book}
                        categoryId={0}
                        categoryName="search"
                        bookIndex={index}
                      />
                    );
                  })}
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
  );
};

const BooksSearchPage = () => {
  return (
    <Suspense fallback={null}>
      <BooksSearchContent />
    </Suspense>
  );
};

export default BooksSearchPage;
