import { useState } from 'react';
import { IoClose, IoDocumentText } from 'react-icons/io5';

interface IScienceFilter {
  id: string;
  value: string;
  label: string;
}

interface IScienceModalProps {
  activeFilters: string[];
  handleFilterChange: (filters: string[]) => void;
  setIsModalOpen: (open: boolean) => void;
  setIsMobileFiltersOpen: (open: boolean) => void;
  FILTERS: IScienceFilter[];
}

const ScienceModal = ({
  activeFilters,
  handleFilterChange,
  setIsModalOpen,
  setIsMobileFiltersOpen,
  FILTERS,
}: IScienceModalProps) => {
  const [tempFilters, setTempFilters] = useState<string[]>(activeFilters);

  // This function is used to update the temporary filters state when a checkbox is checked or unchecked.
  const handleTempFilterChange = (filterId: string, checked: boolean) => {
    setTempFilters((prev) =>
      checked ? [...prev, filterId] : prev.filter((f) => f !== filterId)
    );
  };

  const handleApply = () => {
    handleFilterChange(tempFilters);
    setIsModalOpen(false);
    setIsMobileFiltersOpen(false);
  };

  const handleCancel = () => {
    setTempFilters(activeFilters);
    setIsModalOpen(false);
    setIsMobileFiltersOpen(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[140] transition-opacity duration-200"
        onClick={() => setIsModalOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-[800px] rounded-lg shadow-xl flex flex-col max-h-[80vh] animate-modal-slide-up">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IoDocumentText className="text-2xl text-primary-dark" />
              <h2 className="text-xl font-semibold text-primary-dark">
                Välj artikeltyper
              </h2>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <IoClose className="text-2xl text-gray-500" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FILTERS.map((filter) => (
                <div
                  key={filter.id}
                  className="flex items-center gap-3 p-3 hover:bg-primary-light rounded-md transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    id={`modal-${filter.id}`}
                    checked={tempFilters.includes(filter.id)}
                    onChange={(e) =>
                      handleTempFilterChange(filter.id, e.target.checked)
                    }
                    className="min-w-5 min-h-5 w-5 h-5 rounded border-gray-300 text-primary-medium focus:ring-primary-medium"
                  />
                  <label
                    htmlFor={`modal-${filter.id}`}
                    className="text-dark select-none cursor-pointer"
                  >
                    {filter.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 text-primary-dark bg-white border border-primary-border rounded-md hover:bg-primary-light transition-colors duration-200"
            >
              Avbryt
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-6 py-2.5 text-white bg-primary-dark rounded-md hover:bg-secondary-dark transition-colors duration-200"
            >
              Applicera
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScienceModal;
