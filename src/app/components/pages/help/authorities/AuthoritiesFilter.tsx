import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import { ColorType } from '@/app/types/colorTypes';
import { FaFilter } from 'react-icons/fa';

interface IAuthorititesFilterProps {
  type?: ColorType;
  selectedService: string;
  allServices: string[];
  onServiceChange: (service: string) => void;
}

const AuthoritiesFilter = ({
  type = 'primary',
  selectedService,
  allServices,
  onServiceChange,
}: IAuthorititesFilterProps) => {
  const serviceOptions = [
    { value: '', label: 'Alla tjänster' },
    ...allServices.map((service) => ({ value: service, label: service })),
  ];

  return (
    <div className="flex items-center gap-4">
      <FaFilter className={`text-${type}-dark/60`} />
      <CustomSelect
        options={serviceOptions}
        value={selectedService}
        onChange={onServiceChange}
        name="service-filter"
        placeholder="Alla tjänster"
        size="large"
      />
    </div>
  );
};

export default AuthoritiesFilter;
