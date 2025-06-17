import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import { DOSE_UNIT_OPTIONS } from '@/app/data/dashboard/medications';
import { useField } from 'formik';

const MedicineDosage = () => {
  const [doseField, doseMeta] = useField('dosage');
  const [unitField, unitMeta] = useField('doseUnit');

  const getMaxValue = () => {
    switch (unitField.value) {
      case 'mg':
        return 2000;
      case 'ml':
        return 100;
      case 'tabletter':
        return 10;
      case 'droppar':
        return 50;
      default:
        return 2000;
    }
  };

  const getStepValue = () => {
    switch (unitField.value) {
      case 'mg':
        return 0.5;
      case 'ml':
        return 0.1;
      case 'tabletter':
        return 0.5;
      case 'droppar':
        return 1;
      default:
        return 0.5;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="font-medium">Dosering</label>
      <div className="flex gap-2">
        <div className="flex-1 sm:flex-none">
          <input
            {...doseField}
            type="number"
            placeholder="Mängd"
            min={0}
            max={getMaxValue()}
            step={getStepValue()}
            className="primary-input flex-1"
          />
          {doseMeta.touched && doseMeta.error && (
            <div className="text-red-500 text-sm mt-1">{doseMeta.error}</div>
          )}
        </div>
        <div className="flex-1 sm:flex-none">
          <CustomSelect
            options={DOSE_UNIT_OPTIONS}
            value={unitField.value}
            onChange={(value) =>
              unitField.onChange({ target: { name: 'doseUnit', value } })
            }
            name="doseUnit"
            error={unitMeta.error}
            touched={unitMeta.touched}
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default MedicineDosage;
