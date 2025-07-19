import { IBook, Language } from '../types/api/googleBookTypes';
import { SortOption } from '../types/multimedia/books/sort';
import { useCallback } from 'react';
import {
  getBuiltSearchQuery,
  buildApiUrl,
  sortBooksByRating,
} from '../utils/bookUtils';
import axios from 'axios';
import { ITEMS_PER_PAGE } from '../data/multimedia/books';

const useBookSearchByLanguage = () => {
  const searchBooksByLanguage = useCallback(
    async (
      query: string = '',
      orderBy: SortOption = 'relevance',
      lang: Language = 'sv',
      page: number = 1,
      categoryName?: string
    ): Promise<IBook[]> => {
      const searchQuery = getBuiltSearchQuery({
        lang,
        category: categoryName,
        query,
      });

      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const apiUrl = buildApiUrl(searchQuery, orderBy, lang, startIndex);
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data?.items) {
        let results = [...data.items];

        if (orderBy === 'rating') {
          results = sortBooksByRating(results);
        }

        return results;
      }
      return [];
    },
    []
  );

  return { searchBooksByLanguage };
};

export default useBookSearchByLanguage;
