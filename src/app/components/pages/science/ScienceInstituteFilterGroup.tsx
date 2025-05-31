interface ISelectOption {
  label: string;
  value?: string;
}

interface ScienceInstituteFilterGroupProps {
  label: string;
  options: ISelectOption[];
  value: string;
  onChange: (value: string, type: 'university' | 'hospital') => void;
  type: 'university' | 'hospital';
}

const ScienceInstituteFilterGroup = ({
  label,
  options,
  value,
  onChange,
  type,
}: ScienceInstituteFilterGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-dark">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value, type)}
        className="p-2 border rounded-md bg-white"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ScienceInstituteFilterGroup;
