import { IMedication } from '@/app/types/medication';
import { ErrorMessage, Field } from 'formik';

const MedicationDosage = ({ values }: { values: IMedication }) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="font-medium">Dosering</label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Field
            type="number"
            name="dosage"
            placeholder="Mängd"
            min={0}
            max={
              values.doseUnit === 'mg'
                ? 2000
                : values.doseUnit === 'ml'
                ? 100
                : values.doseUnit === 'tabletter'
                ? 10
                : values.doseUnit === 'droppar'
                ? 50
                : 2000
            }
            step={
              values.doseUnit === 'mg'
                ? 0.5
                : values.doseUnit === 'ml'
                ? 0.1
                : values.doseUnit === 'tabletter'
                ? 0.5
                : values.doseUnit === 'droppar'
                ? 1
                : 0.5
            }
            className="secondary-input flex-1"
          />
          <ErrorMessage
            name="dosage"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="flex-1">
          <Field
            as="select"
            name="doseUnit"
            className="primary-dropdown flex-1"
          >
            <option value="mg">mg</option>
            <option value="ml">ml</option>
            <option value="tabletter">tabletter</option>
            <option value="droppar">droppar</option>
          </Field>
          <ErrorMessage
            name="doseUnit"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default MedicationDosage;
