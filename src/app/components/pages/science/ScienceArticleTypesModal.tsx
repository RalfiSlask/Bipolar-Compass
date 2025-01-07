import { PUBLICATION_TYPE_FILTERS } from '@/app/data/science';
import { useState } from 'react';

interface ScienceArticleTypesModalProps {
  activeFilters: string[];
  handleFilterChange: (filters: string[]) => void;
  setIsModalOpen: (open: boolean) => void;
}

const ScienceArticleTypesModal = ({
  activeFilters,
  handleFilterChange,
  setIsModalOpen,
}: ScienceArticleTypesModalProps) => {
  const [tempFilters, setTempFilters] = useState<string[]>(activeFilters);

  const handleTempFilterChange = (filterId: string, checked: boolean) => {
    setTempFilters((prev) =>
      checked ? [...prev, filterId] : prev.filter((f) => f !== filterId)
    );
  };

  const handleApply = () => {
    handleFilterChange(tempFilters);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setTempFilters(activeFilters);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsModalOpen(false)}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
          className="bg-white w-full max-w-[800px] rounded-lg shadow-xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 id="modal-title" className="text-xl font-medium text-gray-900">
              Artikeltyp
            </h2>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {PUBLICATION_TYPE_FILTERS.map((filter) => (
                <div
                  key={filter.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                >
                  <input
                    type="checkbox"
                    id={filter.id}
                    checked={tempFilters.includes(filter.id)}
                    onChange={(e) =>
                      handleTempFilterChange(filter.id, e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={filter.id}
                    className="text-gray-700 select-none cursor-pointer"
                  >
                    {filter.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Avbryt
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Applicera
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScienceArticleTypesModal;
