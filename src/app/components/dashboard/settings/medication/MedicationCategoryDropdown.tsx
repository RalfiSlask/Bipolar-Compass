import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import { useField } from 'formik';

const MedicationCategoryDropdown = () => {
  const [field, meta] = useField('category');

  const options = [
    { value: '', label: 'Välj kategori...' },
    { value: 'moodStabilizers', label: 'Stämningsstabiliserande' },
    { value: 'antipsychotics', label: 'Antipsykotiska' },
    { value: 'antidepressants', label: 'Antidepressiva' },
  ];

  return (
    <>
      <label className="block text-lg font-medium mb-2">Kategori</label>
      <CustomSelect
        options={options}
        value={field.value}
        onChange={(value) =>
          field.onChange({ target: { name: 'category', value } })
        }
        name="category"
        error={meta.error}
        touched={meta.touched}
        size="large"
      />
    </>
  );
};

export default MedicationCategoryDropdown;
