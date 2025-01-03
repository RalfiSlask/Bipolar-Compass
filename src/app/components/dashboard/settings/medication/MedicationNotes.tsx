import { Field } from 'formik';

const MedicationNotes = () => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">Anteckningar</label>
      <Field
        as="textarea"
        name="notes"
        placeholder="Anteckningar"
        className="secondary-input min-h-[100px] p-3"
        rows={3}
      />
    </div>
  );
};

export default MedicationNotes;
