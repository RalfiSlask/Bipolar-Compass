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
import { BOOK_CATEGORIES, ITEMS_PER_PAGE } from '@/app/data/multimedia/books';
import NotFound from '@/app/not-found';
import {
  IBook,
  IBookCategory,
  Language,
} from '@/app/types/api/googleBookTypes';
import { SortOption } from '@/app/types/multimedia/books/sort';
import { removeDuplicateBooks } from '@/app/utils/bookUtils';
import { useParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import useBookSearchByLanguage from '@/app/hooks/useBookSearchByLanguage';

const CategoryPageContent = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [books, setBooks] = useState<IBook[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [language, setLanguage] = useState<Language>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [additionalSearch, setAdditionalSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [category, setCategory] = useState<IBookCategory | null>(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const { searchBooksByLanguage } = useBookSearchByLanguage();

  // Based on the category slug we set the category & loading state
  useEffect(() => {
    setIsCategoryLoading(true);
    const foundCategory = BOOK_CATEGORIES.find((cat) => cat.slug === slug);
    setCategory(foundCategory || null);
    setIsCategoryLoading(false);
  }, [slug]);

  const searchBooks = useCallback(
    async (
      categoryName: string,
      additionalQuery: string = '',
      orderBy: SortOption = 'relevance',
      lang: Language = 'sv',
      page: number = 1
    ) => {
      setIsInitialLoading(true);
      try {
        if (lang === 'all') {
          // For 'all' language, make two separate API calls and combine results
          const swedishResult = await searchBooksByLanguage(
            additionalQuery,
            orderBy,
            'sv',
            page,
            categoryName
          );
          const englishResult = await searchBooksByLanguage(
            additionalQuery,
            orderBy,
            'en',
            page,
            categoryName
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
          const results = await searchBooksByLanguage(
            additionalQuery,
            orderBy,
            lang,
            page,
            categoryName
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
    if (category) {
      searchBooks(category.name, searchQuery, newSortBy, language, currentPage);
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (category) {
      searchBooks(category.name, searchQuery, sortBy, newLanguage, currentPage);
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
    if (category) {
      searchBooks(category.name, searchQuery, sortBy, language, currentPage);
    }
  }, [category, searchQuery, sortBy, language, currentPage, searchBooks]);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  if (isCategoryLoading) {
    return (
      <div className="max-w-[1440px] w-full px-4 md:px-10 pt-4 md:pt-8">
        <div className="text-center py-8">
          <div className="lightbox-loading-container">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return <NotFound />;
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-center">
      <div className="max-w-[1440px] w-full px-4 md:px-10 pt-4 md:pt-8">
        <BooksSearchContainer
          searchQuery={additionalSearch}
          setSearchQuery={setAdditionalSearch}
          onSubmit={handleSearchSubmit}
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
                {category.label}
                {searchQuery && ` - "${searchQuery}"`}
              </h1>
            </div>
            <BookSearchFilterSkeleton />
            <BookCardsSearchLoadingSkeleton />
          </div>
        ) : (
          <>
            {books.length > 0 && (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold">
                    {category.label}
                    {searchQuery && ` - "${searchQuery}"`}
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
                  {books.map((book, index) => {
                    // Create a unique key based on title and authors
                    const title =
                      book.volumeInfo.title?.toLowerCase().trim() || '';
                    const authors =
                      book.volumeInfo.authors
                        ?.join(', ')
                        .toLowerCase()
                        .trim() || '';
                    const uniqueKey = `${title}|${authors}|${index}`;

                    return (
                      <BookCard
                        key={uniqueKey}
                        book={book}
                        categoryId={category.id}
                        categoryName={category.name}
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

            {books.length === 0 && (
              <div className="text-center py-8">
                <h1 className="text-3xl font-bold mb-4">
                  {category.label}
                  {searchQuery && ` - "${searchQuery}"`}
                </h1>
                <SearchNoResults />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

const CategoryPage = () => {
  return (
    <Suspense fallback={null}>
      <CategoryPageContent />
    </Suspense>
  );
};

export default CategoryPage;
