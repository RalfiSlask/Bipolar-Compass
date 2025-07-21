'use client';

import BooksSearchContainer from '@/app/components/pages/multimedia/books/BooksSearchContainer';
import BookCardsLoadingSkeleton from '@/app/components/pages/multimedia/books/skeletons/BookCardsLoadingSkeleton';
import BookCategoryPanelSkeleton from '@/app/components/pages/multimedia/books/skeletons/BookCategoryPanelSkeleton';
import Spinner from '@/app/components/shared/Spinner';
import { BOOK_CATEGORIES } from '@/app/data/multimedia/books';
import {
  IBook,
  IBookCategory,
  ICategoryBooks,
  Language,
} from '@/app/types/api/googleBookTypes';
import { getBuiltSearchQuery, sortBooksByRating } from '@/app/utils/bookUtils';
import { removeDuplicatesFromArray } from '@/app/utils/generalUtils';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import CategorySection from '../../components/pages/multimedia/books/CategorySection';
import { SortOption } from '@/app/types/multimedia/books/sort';
import { useRouter } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

interface CategoryLoadingState {
  [key: string]: boolean;
}

interface GoogleBooksApiResponse {
  items?: IBook[];
  totalItems?: number;
}

const MAX_RESULTS = 40;

const BooksPage = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [categoryResults, setCategoryResults] = useState<ICategoryBooks[]>([]);
  const [categoryLoadingStates, setCategoryLoadingStates] =
    useState<CategoryLoadingState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  /**
   * Helper function to build the google books api url
   *
   * @param {string} searchQuery - The search query to be encoded and used in the api url
   * @param {SortOption} orderBy - The order by option to be used in the api url
   * @param {Language} lang - The language to be used in the api url
   * @returns {string} - The google books api url
   */
  const buildGoogleBooksApiUrl = (
    searchQuery: string,
    orderBy: SortOption,
    lang: Language
  ): string => {
    let apiUrl = `${BASE_URL}/volumes?q=${encodeURIComponent(
      searchQuery
    )}&langRestrict=${lang}&maxResults=${MAX_RESULTS}&printType=books`;

    if (orderBy !== 'rating') {
      apiUrl += `&orderBy=${orderBy}`;
    }

    apiUrl += `&key=${API_KEY}`;
    return apiUrl;
  };

  const processApiResponse = (
    response: { data: GoogleBooksApiResponse },
    category: IBookCategory,
    orderBy: SortOption
  ): ICategoryBooks => {
    const data = response.data;
    if (data?.items) {
      let books = [...data.items];

      if (orderBy === 'rating') {
        books = sortBooksByRating(books);
      }

      const uniqueBooks = removeDuplicatesFromArray<IBook>(books);

      return {
        category,
        books: uniqueBooks,
        totalFound: data.totalItems || 0,
      };
    }

    return {
      category,
      books: [],
      totalFound: 0,
    };
  };

  const searchByCategory = useCallback(
    async (
      category: IBookCategory,
      orderBy: SortOption = 'relevance',
      lang: Language = 'sv'
    ): Promise<ICategoryBooks> => {
      try {
        const searchQuery = getBuiltSearchQuery({
          lang,
          category: category.name,
        });

        const apiUrl = buildGoogleBooksApiUrl(searchQuery, orderBy, lang);
        const response = await axios.get(apiUrl);
        return processApiResponse(response, category, orderBy);
      } catch (err) {
        console.log(`Error searching for "${category.name}" in ${lang}:`, err);
        return {
          category,
          books: [],
          totalFound: 0,
        };
      }
    },
    []
  );

  const searchByCategoryBothLanguages = useCallback(
    async (
      category: IBookCategory,
      orderBy: SortOption = 'relevance'
    ): Promise<ICategoryBooks> => {
      try {
        const swedishResult = await searchByCategory(category, orderBy, 'sv');
        const englishResult = await searchByCategory(category, orderBy, 'en');

        const combinedBooks = [...swedishResult.books, ...englishResult.books];
        const uniqueBooks = removeDuplicatesFromArray<IBook>(combinedBooks);

        return {
          category,
          books: uniqueBooks,
          totalFound: swedishResult.totalFound + englishResult.totalFound,
        };
      } catch (err) {
        console.log(
          `Error searching for "${category.name}" in both languages:`,
          err
        );
        return {
          category,
          books: [],
          totalFound: 0,
        };
      }
    },
    [searchByCategory]
  );

  const updateCategoryLoadingState = (
    categoryId: number,
    isLoading: boolean,
    setCategoryLoadingStates: React.Dispatch<
      React.SetStateAction<CategoryLoadingState>
    >
  ) => {
    setCategoryLoadingStates((prev) => ({
      ...prev,
      [categoryId]: isLoading,
    }));
  };

  const updateCategoryResults = (
    result: ICategoryBooks,
    setCategoryResults: React.Dispatch<React.SetStateAction<ICategoryBooks[]>>
  ) => {
    if (result.books.length > 0) {
      setCategoryResults((prev) => {
        const existingIndex = prev.findIndex(
          (cat) => cat.category.id === result.category.id
        );
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = result;
          return updated;
        }
        return [...prev, result];
      });
    }
  };

  const initializeLoadingStates = (
    categories: IBookCategory[],
    setCategoryLoadingStates: React.Dispatch<
      React.SetStateAction<CategoryLoadingState>
    >
  ) => {
    const loadingStates: CategoryLoadingState = {};
    categories.forEach((category) => {
      loadingStates[category.id] = true;
    });
    setCategoryLoadingStates(loadingStates);
  };

  const searchAllCategories = useCallback(
    async (orderBy: SortOption = 'relevance') => {
      setIsInitialLoading(true);
      setCategoryResults([]);

      initializeLoadingStates(BOOK_CATEGORIES, setCategoryLoadingStates);

      const searchPromises = BOOK_CATEGORIES.map(async (category) => {
        try {
          const result = await searchByCategoryBothLanguages(category, orderBy);
          updateCategoryLoadingState(
            category.id,
            false,
            setCategoryLoadingStates
          );
          updateCategoryResults(result, setCategoryResults);
          return result;
        } catch (error) {
          console.error(`Error searching category ${category.name}:`, error);
          updateCategoryLoadingState(
            category.id,
            false,
            setCategoryLoadingStates
          );
          return {
            category,
            books: [],
            totalFound: 0,
          };
        }
      });

      try {
        await Promise.all(searchPromises);
      } catch (error) {
        console.error('Error in parallel search:', error);
      } finally {
        setIsInitialLoading(false);
        setCategoryLoadingStates({});
      }
    },
    [searchByCategoryBothLanguages]
  );

  useEffect(() => {
    searchAllCategories('relevance');
  }, [searchAllCategories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(
        `/multimedia/bocker/sok?q=${encodeURIComponent(trimmedQuery)}`
      );
    }
  };

  const showGlobalSpinner = isInitialLoading && categoryResults.length === 0;
  const isLoading = Object.values(categoryLoadingStates).some(Boolean);

  return (
    <>
      <div className="max-w-[1440px] w-full px-4 md:px-10 pt-4 md:py-8 mb-4 sm:mb-16">
        <BooksSearchContainer
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          searchText='Din sökning kommer att kombineras med "bipolar" för att
            hitta relevanta böcker.'
        />
        <div className="relative">
          {showGlobalSpinner && (
            <div className="lightbox-loading-container">
              <Spinner />
            </div>
          )}
          {!showGlobalSpinner && categoryResults.length > 0 && (
            <div className="flex flex-col gap-4 sm:gap-8">
              {categoryResults.map((categoryData, categoryIndex) => {
                const isLoadingCategory =
                  categoryLoadingStates[categoryData.category.id];

                return (
                  <CategorySection
                    key={categoryData.category.id}
                    categoryData={categoryData}
                    isLoadingCategory={isLoadingCategory}
                    categoryIndex={categoryIndex}
                  />
                );
              })}
            </div>
          )}
          {!showGlobalSpinner && !isLoading && categoryResults.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">
                Inga böcker hittades för de valda kategorierna.
              </p>
            </div>
          )}
          {showGlobalSpinner && (
            <div className="bg-primary-light/50 rounded-lg p-6 relative border shadow-md border-primary-light">
              <BookCategoryPanelSkeleton />
              <BookCardsLoadingSkeleton />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BooksPage;
