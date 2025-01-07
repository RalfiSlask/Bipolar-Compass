interface IScienceSortFilterProps {
  handleSortChange: (order: 'newest' | 'oldest' | null) => void;
  sortOrder: 'newest' | 'oldest' | null;
}

const ScienceSortFilter = ({
  handleSortChange,
  sortOrder,
}: IScienceSortFilterProps) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="text-sm text-gray-700">Sortera efter:</span>
      <button
        onClick={() => handleSortChange('newest')}
        className={`px-3 py-1 text-sm rounded-md ${
          sortOrder === 'newest'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Nyast först
      </button>
      <button
        onClick={() => handleSortChange('oldest')}
        className={`px-3 py-1 text-sm rounded-md ${
          sortOrder === 'oldest'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Äldst först
      </button>
    </div>
  );
};

export default ScienceSortFilter;
