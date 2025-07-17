import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BOOK_CATEGORIES } from '../data/multimedia/books';
import { IBook } from '../types/api/googleBookTypes';

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
