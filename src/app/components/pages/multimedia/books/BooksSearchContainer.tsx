import SearchButton from '@/app/components/shared/buttons/SearchButton';
import Image from 'next/image';

interface IBookSearchContainerProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const BooksSearchContainer = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: IBookSearchContainerProps) => {
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
        <p className="text-gray-600 mb-2">
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
          <SearchButton />
        </form>

        <div className="mt-4 text-sm text-gray-500">
          Din sökning kommer att kombineras med &quot;bipolar&quot; för att
          hitta relevanta böcker.
        </div>
      </div>
    </div>
  );
};

export default BooksSearchContainer;
