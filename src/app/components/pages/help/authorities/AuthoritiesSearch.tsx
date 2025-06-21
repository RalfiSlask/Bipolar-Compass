import { useAuthoritiesSearchContext } from '@/app/context/AuthoritiesSearchContext';
import { ColorType } from '@/app/types/colorTypes';
import { FaSearch } from 'react-icons/fa';
import AuthoritiesFilter from './AuthoritiesFilter';

interface IAuthoritiesSearchProps {
  type?: ColorType;
}

const AuthoritiesSearch = ({ type = 'primary' }: IAuthoritiesSearchProps) => {
  const {
    searchTerm,
    selectedService,
    allServices,
    filteredCount,
    totalCount,
    handleSearchChange,
    handleServiceFilterChange,
  } = useAuthoritiesSearchContext();

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="relative">
        <FaSearch
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-${type}-dark/60`}
        />
        <input
          type="text"
          placeholder="Sök efter myndighet eller tjänst..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="primary-input w-full pl-10"
        />
      </div>
      <AuthoritiesFilter
        type={type}
        selectedService={selectedService}
        allServices={allServices}
        onServiceChange={handleServiceFilterChange}
      />

      <div className={`text-sm text-${type}-dark/70`}>
        Visar {filteredCount} av {totalCount} myndigheter
      </div>
    </div>
  );
};

export default AuthoritiesSearch;
