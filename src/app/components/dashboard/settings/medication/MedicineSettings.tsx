import { medicineCategories } from '@/app/data/medications';
import useSettingsContext from '@/app/hooks/useSettingsContext';
import { IMedication } from '@/app/types/medication';
import { getNumberOfTimes } from '@/app/utils/medicineUtils';
import { medicineValidationSchema } from '@/app/utils/validationSchemas';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import AntiDepressantMedicationMessage from './AntiDepressantMedicationMessage';
import MedicationCategoryDropdown from './MedicationCategoryDropdown';
import MedicationNotes from './MedicationNotes';
import MedicationReminder from './MedicationReminder';
import MedicineDosage from './MedicineDosage';
import MedicineFrequencyDropdown from './MedicineFrequencyDropdown';
import YourMedications from './YourMedications';

const MedicineSettings = () => {
  const { user, saveMedicationSettings } = useSettingsContext();

  if (!user) {
    throw new Error('Användardata saknas');
  }

  const [medications, setMedicines] = useState<IMedication[]>(
    user.profile.medications
  );
  const [isAddingMedicine, setIsAddingMedicine] = useState(false);

  const initialValues: IMedication = {
    category: '',
    name: '',
    dosage: 0,
    doseUnit: 'mg',
    frequency: '',
    times: [''],
    notes: '',
    reminder: { enabled: false, method: '', times: [] },
  };

  const saveSettings = async (newMedicines: IMedication[]) => {
    try {
      await saveMedicationSettings(newMedicines, user.email);
      setMedicines(newMedicines);
    } catch (err) {
      console.error('could not save medications: ', err);
    }
  };

  const handleSubmit = async (values: IMedication) => {
    console.log('Form submitted with values:', values);

    const {
      name,
      category,
      dosage,
      doseUnit,
      frequency,
      times,
      notes,
      reminder,
    } = values;

    try {
      const newMedicine = {
        category: category,
        name: name,
        dosage: Number(dosage),
        doseUnit: doseUnit,
        times: times || [],
        frequency: frequency,
        notes: notes,
        reminder: {
          enabled: Boolean(reminder.enabled),
          method: reminder.method || 'email',
          times: reminder.times || [],
        },
      };

      console.log('Saving medicine:', newMedicine);
      const newMedicines = [...medications, newMedicine];
      await saveSettings(newMedicines);
      setIsAddingMedicine(false);
    } catch (error) {
      console.error('could not save medicine:', error);
    }
  };

  const handleDeleteMedicine = async (index: number) => {
    try {
      const newMedicines = medications.filter((_, i) => i !== index);
      await saveSettings(newMedicines);
    } catch (error) {
      console.error('could not delete medicine:', error);
    }
  };

  return (
    <div className="max-w-2xl py-6">
      <h2 className="text-2xl font-semibold mb-6">Medicininställningar</h2>
      {!isAddingMedicine && (
        <button
          className="primary-button"
          onClick={() => setIsAddingMedicine(true)}
        >
          Lägg till ny medicin
        </button>
      )}
      {isAddingMedicine && (
        <Formik
          initialValues={initialValues}
          validationSchema={medicineValidationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validateOnMount={false}
        >
          {({ values }) => (
            <Form className="flex flex-col gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col gap-4">
                  <MedicationCategoryDropdown />
                  {values.category === 'antidepressants' && (
                    <AntiDepressantMedicationMessage />
                  )}
                  {values.category && (
                    <>
                      <label className="block text-lg font-medium mb-2">
                        Medicin
                      </label>
                      <Field
                        as="select"
                        name="name"
                        className="primary-dropdown"
                      >
                        <option value="">Välj medicin...</option>
                        {medicineCategories[
                          values.category as keyof typeof medicineCategories
                        ].map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col gap-6">
                  <MedicineDosage values={values} />
                  <MedicineFrequencyDropdown />
                  {values.frequency && values.frequency !== 'as_needed' && (
                    <div className="flex flex-col gap-4">
                      <label className="font-medium">Tidpunkt</label>
                      <div className="flex flex-wrap gap-2">
                        {Array.from({
                          length: getNumberOfTimes(values.frequency),
                        }).map((_, index) => (
                          <div key={index} className="flex flex-col">
                            <Field
                              type="time"
                              name={`times.${index}`}
                              className="secondary-input w-32 time-input"
                            />
                            <ErrorMessage
                              name={`times.${index}`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col gap-6">
                  <MedicationNotes />
                  <MedicationReminder />
                </div>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="primary-button">
                  Lägg till medicin
                </button>
                <button
                  type="button"
                  className="tertiary-button w-40"
                  onClick={() => setIsAddingMedicine(false)}
                >
                  Avbryt
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {!isAddingMedicine && medications.length > 0 && (
        <YourMedications
          medications={medications}
          handleDeleteMedicine={handleDeleteMedicine}
        />
      )}
    </div>
  );
};

export default MedicineSettings;
