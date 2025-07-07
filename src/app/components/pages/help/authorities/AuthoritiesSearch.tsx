import useAuthoritiesContext from '@/app/hooks/useAuthoritiesContext';
import { ColorType } from '@/app/types/colorTypes';
import { FaSearch } from 'react-icons/fa';

interface IAuthoritiesSearchProps {
  type?: ColorType;
}

const AuthoritiesSearch = ({ type = 'primary' }: IAuthoritiesSearchProps) => {
  const { searchTerm, handleSearchChange } = useAuthoritiesContext();

  return (
    <div className="mb-4">
      <div className="relative">
        <FaSearch
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-${type}-dark/60`}
        />
        <input
          type="text"
          placeholder="Sök efter myndighet eller tjänst..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="sökfält för att söka efter myndigheter eller tjänster"
          className="primary-input w-full pl-10"
        />
      </div>
    </div>
  );
};

export default AuthoritiesSearch;
