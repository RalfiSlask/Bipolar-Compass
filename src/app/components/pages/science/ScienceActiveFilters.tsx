import { IoClose } from 'react-icons/io5';

interface IScienceActiveFiltersProps {
  ScienceActiveFilters: string[];
  clearAllFilters: () => void;
  removeFilter: (filter: string) => void;
}

const ScienceActiveFilters = ({
  ScienceActiveFilters,
  clearAllFilters,
  removeFilter,
}: IScienceActiveFiltersProps) => {
  if (ScienceActiveFilters.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-primary-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-primary-dark">
            Aktiva filter
          </span>
          <span className="bg-primary-medium text-white text-xs px-2 py-0.5 rounded-full">
            {ScienceActiveFilters.length}
          </span>
        </div>
        <button
          onClick={clearAllFilters}
          className="text-sm text-red-500 hover:text-primary-dark transition-colors duration-200"
        >
          Rensa alla
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {ScienceActiveFilters.map((filter) => (
          <div
            key={filter}
            className="group flex items-center gap-1.5 bg-primary-light px-3 py-1.5 rounded-full border border-primary-border hover:border-primary-medium transition-all duration-200"
          >
            <span className="text-sm text-primary-dark">{filter}</span>
            <button
              onClick={() => removeFilter(filter)}
              className="p-1 rounded-full hover:bg-primary-medium/10 transition-colors duration-200"
            >
              <IoClose className="text-primary-medium group-hover:text-primary-dark transition-colors duration-200" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScienceActiveFilters;
