import { ErrorMessage, Field } from 'formik';

const MedicationCategoryDropdown = () => {
  return (
    <>
      <label className="block text-lg font-medium mb-2">Kategori</label>
      <Field as="select" name="category" className="primary-dropdown">
        <option value="">Välj kategori...</option>
        <option value="moodStabilizers">Stämningsstabiliserande</option>
        <option value="antipsychotics">Antipsykotiska</option>
        <option value="antidepressants">Antidepressiva</option>
      </Field>
      <ErrorMessage
        name="category"
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </>
  );
};

export default MedicationCategoryDropdown;
