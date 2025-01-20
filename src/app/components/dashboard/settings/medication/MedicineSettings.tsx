import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import VerficationMessage from '@/app/components/shared/VerficationMessage';
import { medicineCategories } from '@/app/data/medications';
import { IMedication } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import { getNumberOfTimes } from '@/app/utils/medicineUtils';
import { medicineValidationSchema } from '@/app/utils/validationSchemas';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AntiDepressantMedicationMessage from './AntiDepressantMedicationMessage';
import MedicationCategoryDropdown from './MedicationCategoryDropdown';
import MedicationNotes from './MedicationNotes';
import MedicationReminder from './MedicationReminder';
import MedicineDosage from './MedicineDosage';
import MedicineFrequencyDropdown from './MedicineFrequencyDropdown';
import YourMedications from './YourMedications';

interface MedicineSettingsProps {
  user: IUser;
  saveMedicationSettings: (medications: IMedication[]) => Promise<void>;
}

const MedicineSettings = ({
  user,
  saveMedicationSettings,
}: MedicineSettingsProps) => {
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
      await saveMedicationSettings(newMedicines);
      setMedicines(newMedicines);
    } catch (err) {
      console.error('could not save medications: ', err);
      toast.error('Kunde inte spara mediciner');
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
      toast.success('Medicin tillagd');
    } catch (error) {
      console.error('could not save medicine:', error);
      toast.error('Kunde inte spara medicin');
    }
  };

  const handleDeleteMedicine = async (index: number) => {
    try {
      const newMedicines = medications.filter((_, i) => i !== index);
      await saveSettings(newMedicines);
      toast.success('Medicin borttagen');
    } catch (error) {
      console.error('could not delete medicine:', error);
      toast.error('Kunde inte ta bort medicin');
    }
  };

  return (
    <div
      className="mx-auto max-w-7xl w-full"
      aria-labelledby="medicine-heading"
    >
      {!user?.isVerified && <VerficationMessage />}
      <div className="flex flex-col gap-3 text-center">
        <h2
          id="medicine-heading"
          className={`text-3xl font-semibold ${
            !user.isVerified ? 'text-gray-400' : 'text-primary-dark'
          }`}
        >
          Mediciner
        </h2>
        <p
          className={`${!user.isVerified ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Hantera dina mediciner och påminnelser för medicinering.
        </p>
      </div>

      <div
        className={`w-full space-y-6 ${
          !user.isVerified ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
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
            {({ values, setFieldValue, errors, touched }) => (
              <Form className="flex flex-col gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
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
                        <CustomSelect
                          options={medicineCategories[
                            values.category as keyof typeof medicineCategories
                          ].map((option) => ({
                            value: option.value,
                            label: option.label,
                          }))}
                          value={values.name}
                          onChange={(value: string) => {
                            setFieldValue('name', value);
                          }}
                          name="name"
                          error={errors.name}
                          touched={touched.name}
                          size="large"
                          placeholder="Välj medicin..."
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex flex-col gap-6">
                    <MedicineDosage />
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
                                className="primary-input w-32 time-input"
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

                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex flex-col gap-6">
                    <MedicationNotes />
                    <MedicationReminder />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="primary-button py-1">
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
    </div>
  );
};

export default MedicineSettings;
