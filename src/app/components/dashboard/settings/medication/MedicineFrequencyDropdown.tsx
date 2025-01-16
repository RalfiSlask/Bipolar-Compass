import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import { useField } from 'formik';

const MedicationFrequencyDropdown = () => {
  const [field, meta] = useField('frequency');

  const options = [
    { value: '', label: 'Välj frekvens...' },
    { value: '1_daily', label: '1 gång om dagen' },
    { value: '2_daily', label: '2 gånger om dagen' },
    { value: '3_daily', label: '3 gånger om dagen' },
    { value: '4_daily', label: '4 gånger om dagen' },
    { value: 'weekly', label: '1 gång i veckan' },
    { value: 'as_needed', label: 'Vid behov' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <label className="font-medium">Hur ofta?</label>
      <CustomSelect
        options={options}
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
