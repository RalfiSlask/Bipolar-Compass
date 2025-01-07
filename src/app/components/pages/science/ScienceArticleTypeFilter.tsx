import { PUBLICATION_TYPE_FILTERS } from '@/app/data/science';

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
    <div>
      <h3 className="font-medium text-gray-700 mb-2">Artikeltyp</h3>
      {PUBLICATION_TYPE_FILTERS.map((filter, index) => {
        if (index < 6) {
          return (
            <div key={filter.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={filter.id}
                checked={activeFilters.includes(filter.id)}
                onChange={(e) =>
                  handleFilterChange(filter.id, e.target.checked)
                }
              />
              <label htmlFor={filter.id}>{filter.label}</label>
            </div>
          );
        }
      })}
      <button
        aria-label="Se alla artikeltyper"
        className=""
        onClick={() => setIsModalOpen(true)}
      >
        Se alla artikeltyper
      </button>
    </div>
  );
};

export default ScienceArticleTypeFilter;
