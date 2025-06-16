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
