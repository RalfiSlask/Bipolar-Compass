import { IoTimeSharp } from 'react-icons/io5';

interface IScienceSortFilterProps {
  handleSortChange: (order: 'newest' | 'oldest' | null) => void;
  sortOrder: 'newest' | 'oldest' | null;
}

const ScienceSortFilter = ({
  handleSortChange,
  sortOrder,
}: IScienceSortFilterProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-primary-dark font-medium">
        Sortera efter:
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => handleSortChange('newest')}
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-all duration-200 ${
            sortOrder === 'newest'
              ? 'bg-primary-dark border border-primary-border text-white shadow-sm'
              : 'bg-white border border-primary-border text-primary-dark hover:bg-primary-light'
          }`}
        >
          <IoTimeSharp
            className={`text-lg ${
              sortOrder === 'newest' ? 'rotate-0' : 'rotate-180'
            }`}
          />
          <span>Nyast först</span>
        </button>
        <button
          onClick={() => handleSortChange('oldest')}
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-all duration-200 ${
            sortOrder === 'oldest'
              ? 'bg-primary-dark border border-primary-border text-white shadow-sm'
              : 'bg-white border border-primary-border text-primary-dark hover:bg-primary-light'
          }`}
        >
          <IoTimeSharp
            className={`text-lg ${
              sortOrder === 'oldest' ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <span>Äldst först</span>
        </button>
      </div>
    </div>
  );
};

export default ScienceSortFilter;
