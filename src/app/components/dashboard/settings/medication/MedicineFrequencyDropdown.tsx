import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import { MEDICATION_FREQUENCY_OPTIONS } from '@/app/data/medications';
import { useField } from 'formik';

const MedicationFrequencyDropdown = () => {
  const [field, meta] = useField('frequency');

  return (
    <div className="flex flex-col gap-4">
      <label className="font-medium">Hur ofta?</label>
      <CustomSelect
        options={MEDICATION_FREQUENCY_OPTIONS}
        value={field.value}
        onChange={(value) =>
          field.onChange({ target: { name: 'frequency', value } })
        }
        name="frequency"
        error={meta.error}
        touched={meta.touched}
        size="large"
      />
    </div>
  );
};

export default MedicationFrequencyDropdown;
