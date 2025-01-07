interface ScienceExtentFilterProps {
  searchScope: string;
  handleLanguageFilterClick: (language: 'swedish' | 'international') => void;
}

const ScienceExtentFilter = ({
  searchScope,
  handleLanguageFilterClick,
}: ScienceExtentFilterProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <h3 className="font-medium text-gray-700">Välj omfattning</h3>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleLanguageFilterClick('international')}
          className={`p-2 rounded-md ${
            searchScope === 'international'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Internationella artiklar
        </button>
        <button
          onClick={() => handleLanguageFilterClick('swedish')}
          className={`p-2 rounded-md ${
            searchScope === 'swedish'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Svenska artiklar
        </button>
      </div>
    </div>
  );
};

export default ScienceExtentFilter;
