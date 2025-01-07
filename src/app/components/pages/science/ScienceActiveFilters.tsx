interface IScienceActiveFiltersProps {
  ScienceActiveFilters: string[];
  clearAllFilters: () => void;
}

const ScienceActiveFilters = ({
  ScienceActiveFilters,
  clearAllFilters,
}: IScienceActiveFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-700">Aktiva filter:</span>
      {ScienceActiveFilters.map((filter) => (
        <span
          key={filter}
          className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-md"
        >
          {filter}
        </span>
      ))}
      <button
        onClick={clearAllFilters}
        className="px-2 py-1 text-sm text-red-600 hover:text-red-800 hover:underline"
      >
        Rensa alla filter
      </button>
    </div>
  );
};

export default ScienceActiveFilters;
