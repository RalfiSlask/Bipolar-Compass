import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BooksSearchContainer = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/multimedia/bocker/sok?q=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  return (
    <div className="w-full lg:h-[350px] shadow-md bg-white rounded-lg p-4 md:px-10 py-6 flex flex-col lg:flex-row justify-between gap-10 mb-8">
      <Image
        src="/images/multimedia/books/books.webp"
        alt="böcker"
        width={6730}
        height={4444}
        quality={80}
        priority={true}
        aria-label="böcker"
        className="w-auto aspect-auto h-full object-cover"
      />
      <div className="max-w-3xl flex flex-col justify-center w-full bg-white">
        <h2 className="text-xl md:text-2xl font-semibold text-primary-dark mb-4">
          Sök bland böcker om bipolaritet
        </h2>
        <p className="text-gray-600 mb-6">
          Ange en sökterm för att hitta böcker om bipolär sjukdom och dess olika
          aspekter.
        </p>
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1">
            <input
              type="text"
              name="search"
              id="search"
              aria-label="input för att söka böcker"
              placeholder="Skriv din sökterm här..."
              className="primary-input !h-12 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-primary-dark hover:bg-secondary-dark text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
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
        </form>
      </div>
    </div>
  );
};

export default BooksSearchContainer;
