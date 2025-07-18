import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import {
  BOOK_CATEGORIES,
  GOOGLE_BOOKS_API_KEY,
  GOOGLE_BOOKS_BASE_URL,
  MAX_RESULTS,
} from '../data/multimedia/books';
import { IBook, Language } from '../types/api/googleBookTypes';
import { SortOption } from '../types/multimedia/books/sort';
/**
 * Renders stars based on book rating
 *
 * @param {number} rating - The book rating to render stars for
 * @returns {React.ReactNode[]} - An array of React nodes representing the stars
 */
export const renderStarsFromRating = (rating: number): React.ReactNode[] => {
  const stars = [];

  // If no rating is provided, return 5 empty stars
  if (!rating || rating === 0) {
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    return stars;
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-500" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
  }
  const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
  }

  return stars;
};

/**
 * Extracts ISBN-13 or ISBN-10 from industry identifiers
 *
 * @param {Array} industryIdentifiers - Array of industry identifiers from Google Books API
 * @returns {string | null} - The ISBN number or null if not found
 */
export const getISBNFromIdentifiers = (
  industryIdentifiers?: { type: string; identifier: string }[]
): string | null => {
  if (!industryIdentifiers || industryIdentifiers.length === 0) {
    return null;
  }

  // Prefer ISBN_13 over ISBN_10
  const isbn13 = industryIdentifiers.find((id) => id.type === 'ISBN_13');
  if (isbn13) {
    return isbn13.identifier;
  }

  const isbn10 = industryIdentifiers.find((id) => id.type === 'ISBN_10');
  if (isbn10) {
    return isbn10.identifier;
  }

  return null;
};

/**
 * Generates a bookstore link from ISBN
 *
 * @param {string} isbn - The ISBN number
 * @param {string} url - The base URL for the bookstore
 * @returns {string} - The complete bookstore link
 */
export const generateBookLinkFromISBN = (isbn: string, url: string): string => {
  const cleanISBN = isbn.replace(/-/g, '');
  return `${url}${encodeURIComponent(cleanISBN)}`;
};

/**
 * Gets the Swedish category label for a given category
 *
 * @param {string} category - The category to get the label for
 * @returns {string} - The Swedish category label
 */
export const getSwedishCategoryLabel = (category: string) => {
  const matchedCategory = BOOK_CATEGORIES.find(
    (cat) => cat.name.toLowerCase() === category.toLowerCase()
  );
  return matchedCategory?.label || category;
};

export const getBookTitleAsSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace any non-alphanumeric chars with -
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export const sortBooksByRating = (books: IBook[]): IBook[] => {
  return books.sort((a: IBook, b: IBook) => {
    const ratingA = a.volumeInfo.averageRating || 0;
    const ratingB = b.volumeInfo.averageRating || 0;
    const countA = a.volumeInfo.ratingsCount || 0;
    const countB = b.volumeInfo.ratingsCount || 0;

    if (ratingA && !ratingB) return -1;
    if (!ratingA && ratingB) return 1;
    if (ratingA !== ratingB) return ratingB - ratingA;
    return countB - countA;
  });
};

/**
 * Function for increasing the zoom level (image quality) in the uri for google books
 *
 * @param {string} thumbnail - thumbnail link to image
 * @returns {string} - thumbnail uri
 */
export const increaseThumbnailQualityByZoom = (
  thumbnail: string,
  zoom: number = 1
): string => {
  return thumbnail?.replace(/zoom=\d/, `zoom=${zoom}`);
};

/**
 * Checks if the provided ISBN is valid (13 digits).
 *
 * @param {string} isbn
 * @returns {boolean} - if isbn is valid or not
 */
export const isISBNValid = (isbn: string): boolean => {
  return /^\d{13}$/.test(isbn || '');
};

export const removeDuplicateBooks = (books: IBook[]): IBook[] => {
  const seen = new Set<string>();
  return books.filter((book) => {
    const title = book.volumeInfo.title?.toLowerCase().trim() || '';
    const authors =
      book.volumeInfo.authors?.join(', ').toLowerCase().trim() || '';
    const key = `${title}|${authors}`;

    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

/**
 * Builds Google Books API url based on relevant queries
 *
 * Takes in account if we should restrict url by language
 * @param {string} searchQuery - users search term
 * @param {SortOption} orderBy - sorting options like latest / newest etc
 * @param {Language} lang - language that also includes an all option
 * @param {number} startIndex
 * @returns {string} - built api url
 */
export const buildApiUrl = (
  searchQuery: string,
  orderBy: SortOption,
  lang: Language,
  startIndex: number
): string => {
  let apiUrl = `${GOOGLE_BOOKS_BASE_URL}/volumes?q=${encodeURIComponent(
    searchQuery
  )}&maxResults=${MAX_RESULTS}&startIndex=${startIndex}&printType=books`;

  // Only add langRestrict if language is not 'all'
  if (lang !== 'all') {
    apiUrl += `&langRestrict=${lang}`;
  }

  if (orderBy !== 'rating') {
    apiUrl += `&orderBy=${orderBy}`;
  }

  apiUrl += `&key=${GOOGLE_BOOKS_API_KEY}`;
  return apiUrl;
};

/**
 * Builds a search query for Google Books API
 *
 * Takes in account if we should restrict url by language by checking if the language is not 'all'
 * If we provide a category, we add it to the search query
 * If we provide an additional query, we add it to the search query
 * @param {string} lang - The language to search in
 * @param {string} additionalQuery - Additional search query
 * @param {string} category - The category to search in
 * @returns {string} - The built search query
 */
export const getBuiltSearchQuery = (
  lang: string,
  additionalQuery: string,
  category?: string
) => {
  const specificBipolarTerm = lang === 'sv' ? 'bipolär' : 'bipolar';
  const categorySubject = category ? `subject:"${category}"+` : '';
  let searchQuery = `${categorySubject}(intitle:${specificBipolarTerm} OR "${specificBipolarTerm}")`;

  if (additionalQuery.trim()) {
    searchQuery += ` AND ${additionalQuery}`;
  }

  return searchQuery;
};
