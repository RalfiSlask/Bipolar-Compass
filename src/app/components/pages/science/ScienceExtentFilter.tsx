import { IoGlobeOutline, IoHomeOutline } from 'react-icons/io5';

interface ScienceExtentFilterProps {
  searchScope: string;
  handleLanguageFilterClick: (language: 'swedish' | 'international') => void;
}

const ScienceExtentFilter = ({
  searchScope,
  handleLanguageFilterClick,
}: ScienceExtentFilterProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium text-primary-dark">Omfattning</h3>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleLanguageFilterClick('international')}
          className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
            searchScope === 'international'
              ? 'bg-primary-dark border border-primary-dark text-white shadow-md'
              : 'bg-white border border-primary-border text-primary-dark hover:bg-primary-light'
          }`}
        >
          <IoGlobeOutline className="text-xl" />
          <span>Internationella artiklar</span>
        </button>
        <button
          onClick={() => handleLanguageFilterClick('swedish')}
          className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
            searchScope === 'swedish'
              ? 'bg-primary-dark border border-primary-dark text-white shadow-md'
              : 'bg-white border border-primary-border text-primary-dark hover:bg-primary-light'
          }`}
        >
          <IoHomeOutline className="text-xl" />
          <span>Svenska artiklar</span>
        </button>
      </div>
    </div>
  );
};

export default ScienceExtentFilter;
