import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import useAuthoritiesContext from '@/app/hooks/useAuthoritiesContext';
import { ColorType } from '@/app/types/colorTypes';
import { FaFilter } from 'react-icons/fa';

interface IAuthoritiesFilterProps {
  type?: ColorType;
}

const AuthoritiesFilter = ({ type = 'primary' }: IAuthoritiesFilterProps) => {
  const {
    selectedServiceCategory,
    allServiceCategories,
    handleServiceCategoryChange,
  } = useAuthoritiesContext();

  // The custom select component expects an array of objects with value and label properties.
  const serviceOptions = [
    { value: '', label: 'Alla kategorier' },
    ...allServiceCategories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  return (
    <div className="mb-4 flex items-center gap-4">
      <FaFilter className={`text-${type}-dark/60`} />
      <CustomSelect
        options={serviceOptions}
        value={selectedServiceCategory}
        onChange={handleServiceCategoryChange}
        name="service-filter"
        placeholder="Alla kategorier"
        size="large"
      />
    </div>
  );
};

export default AuthoritiesFilter;
