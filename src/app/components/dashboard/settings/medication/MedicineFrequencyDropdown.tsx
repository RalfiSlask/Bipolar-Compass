import { ErrorMessage } from 'formik';

import { Field } from 'formik';

const MedicationFrequencyDropdown = () => {
  return (
    <div className="flex flex-col gap-4">
      <label className="font-medium">Hur ofta?</label>
      <Field as="select" name="frequency" className="primary-dropdown">
        <option value="">Välj frekvens...</option>
        <option value="1_daily">1 gång om dagen</option>
        <option value="2_daily">2 gånger om dagen</option>
        <option value="3_daily">3 gånger om dagen</option>
        <option value="4_daily">4 gånger om dagen</option>
        <option value="weekly">1 gång i veckan</option>
        <option value="as_needed">Vid behov</option>
      </Field>
      <ErrorMessage
        name="frequency"
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default MedicationFrequencyDropdown;
