export const BOOK_CATEGORIES = [
  {
    id: 1,
    name: 'Psychology',
    label: 'Psykologi',
    slug: 'psykologi',
  },
  {
    id: 2,
    name: 'Medical',
    label: 'Medicin',
    slug: 'medicin',
  },
  {
    id: 3,
    name: 'Self-Help',
    label: 'Självhjälp',
    slug: 'sjalvhjalp',
  },
  {
    id: 4,
    name: 'Health & Fitness',
    label: 'Hälsa & Fitness',
    slug: 'halsa-och-fitness',
  },
  {
    id: 5,
    name: 'Family & Relationships',
    label: 'Familj & Relationer',
    slug: 'familj-och-relationer',
  },
  {
    id: 6,
    name: 'Education',
    label: 'Utbildning',
    slug: 'utbildning',
  },
  {
    id: 7,
    name: 'Biography & Autobiography',
    label: 'Biografi',
    slug: 'biografi',
  },
];

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevans' },
  { value: 'rating', label: 'Betyg' },
  { value: 'newest', label: 'Nyast' },
];

export const MAX_RESULTS = 10;
export const ITEMS_PER_PAGE = 10;

export const GOOGLE_BOOKS_BASE_URL =
  process.env.NEXT_PUBLIC_GOOGLE_BOOKS_BASE_URL;
export const GOOGLE_BOOKS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
