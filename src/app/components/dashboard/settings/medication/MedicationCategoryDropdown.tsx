import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import { MEDICATION_CATEGORIES } from '@/app/data/dashboard/medications';
import { useField } from 'formik';

const MedicationCategoryDropdown = () => {
  const [field, meta] = useField('category');

  return (
    <>
      <label className="block text-lg font-medium mb-2">Kategori</label>
      <CustomSelect
        options={MEDICATION_CATEGORIES}
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
