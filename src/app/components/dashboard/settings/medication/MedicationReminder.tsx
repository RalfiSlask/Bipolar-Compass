import { Field } from 'formik';

const MedicationReminder = () => {
  return (
    <div className="flex items-center gap-2">
      <Field
        type="checkbox"
        id="reminder"
        name="reminder.enabled"
        className="primary-checkbox"
      />
      <label htmlFor="reminder" className="text-gray-700">
        Påminnelse till din e-post
      </label>
    </div>
  );
};

export default MedicationReminder;
