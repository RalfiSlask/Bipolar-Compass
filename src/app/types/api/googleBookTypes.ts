export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
  };
  saleInfo?: {
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
    retailPrice?: {
      amount: number;
      currencyCode: string;
    };
    buyLink?: string;
    saleability?: Saleability;
  };
  searchInfo?: {
    textSnippet?: string;
  };
  accessInfo?: {
    webReaderLink?: string;
    accessViewStatus?: string;
    pdf?: {
      isAvailable: boolean;
      downloadLink?: string;
    };
    epub?: {
      isAvailable: boolean;
      downloadLink?: string;
    };
  };
}

type Saleability =
  | 'FOR_SALE'
  | 'FOR_RENTAL_ONLY'
  | 'FOR_SALE_AND_RENTAL'
  | 'FREE'
  | 'NOT_FOR_SALE'
  | 'FOR_PREORDER';

export interface IBookCategory {
  id: number;
  name: string;
  label: string;
}

export interface ICategoryBooks {
  category: IBookCategory;
  books: IBook[];
  totalFound: number;
}

export type Language = 'en' | 'sv';
