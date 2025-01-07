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
    <div>
      <h3 className="font-medium text-gray-700 mb-2">{title}</h3>
      <div className="flex flex-col gap-2">
        {filters.map((filter) => (
          <div key={filter.id} className="flex items-center gap-2">
            <input
              type={type}
              id={filter.id}
              name={name}
              checked={selectedValues.includes(filter.id)}
              onChange={(e) => onChange(filter.id, e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={filter.id} className="text-gray-700">
              {filter.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
