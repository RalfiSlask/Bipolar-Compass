import { PUBLICATION_TYPE_FILTERS } from '@/app/data/science';
import { IoChevronForward } from 'react-icons/io5';

interface IScienceArticleTypeFilterProps {
  activeFilters: string[];
  handleFilterChange: (id: string, checked: boolean) => void;
  setIsModalOpen: (open: boolean) => void;
}

const ScienceArticleTypeFilter = ({
  activeFilters,
  handleFilterChange,
  setIsModalOpen,
}: IScienceArticleTypeFilterProps) => {
  return (
    <div className="pt-6">
      <h3 className="font-medium text-primary-dark mb-3">Artikeltyp</h3>
      <div className="space-y-2">
        {PUBLICATION_TYPE_FILTERS.map((filter, index) => {
          if (index < 6) {
            return (
              <div key={filter.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={filter.id}
                  checked={activeFilters.includes(filter.id)}
                  onChange={(e) =>
                    handleFilterChange(filter.id, e.target.checked)
                  }
                  className="w-5 h-5 rounded border-gray-300 text-primary-medium focus:ring-primary-medium"
                />
                <label
                  htmlFor={filter.id}
                  className="text-dark select-none cursor-pointer"
                >
                  {filter.label}
                </label>
              </div>
            );
          }
        })}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 w-full flex items-center justify-between px-4 py-2 text-primary-dark hover:text-dark hover:bg-primary-light rounded-md transition-colors duration-200"
      >
        <span>Se alla artikeltyper</span>
        <IoChevronForward className="text-lg" />
      </button>
    </div>
  );
};

export default ScienceArticleTypeFilter;
