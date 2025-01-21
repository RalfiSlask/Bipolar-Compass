interface IFilterOption {
  id: string;
  label: string;
  value?: string;
}

interface FilterGroupProps {
  title: string;
  filters: IFilterOption[];
  selectedValues: string[];
  onChange: (id: string, checked: boolean) => void;
  type?: 'checkbox' | 'radio';
  name?: string;
}

const FilterGroup = ({
  title,
  filters,
  selectedValues,
  onChange,
  type = 'checkbox',
  name,
}: FilterGroupProps) => {
  return (
    <div className="pt-6">
      <h3 className="font-medium text-primary-dark mb-3">{title}</h3>
      <div className="space-y-2">
        {filters.map((filter) => (
          <div key={filter.id} className="flex items-center gap-3">
            <input
              type={type}
              id={filter.id}
              name={name}
              checked={selectedValues.includes(filter.id)}
              onChange={(e) => onChange(filter.id, e.target.checked)}
              className={`w-5 h-5 border-gray-300 text-primary-medium focus:ring-primary-medium ${
                type === 'checkbox' ? 'rounded' : 'rounded-full'
              }`}
            />
            <label htmlFor={filter.id} className="text-gray-700 select-none cursor-pointer">
              {filter.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
