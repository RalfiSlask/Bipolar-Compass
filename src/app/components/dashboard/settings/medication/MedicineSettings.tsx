import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import VerficationMessage from '@/app/components/shared/VerficationMessage';
import { MEDICATION_OPTIONS } from '@/app/data/medications';
import { Reminder } from '@/app/models/Medication';
import { IHistory, IMedication, ISchedule } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import { getNumberOfTimes } from '@/app/utils/medicineUtils';
import { medicineValidationSchema } from '@/app/utils/validationSchemas';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiClock, FiList, FiPlusCircle, FiShield } from 'react-icons/fi';
import { MdMedication } from 'react-icons/md';
import AntiDepressantMedicationMessage from './AntiDepressantMedicationMessage';
import MedicationCategoryDropdown from './MedicationCategoryDropdown';
import MedicationNotes from './MedicationNotes';
import MedicationReminder from './MedicationReminder';
import MedicineDosage from './MedicineDosage';
import MedicineFrequencyDropdown from './MedicineFrequencyDropdown';
import YourMedications from './YourMedications';
import AddMedicationButtons from './AddMedicationButtons';

interface MedicineSettingsProps {
  user: IUser;
  saveMedicationSettings: (
    medications: IMedication[]
  ) => Promise<IMedication[]>;
}

const MedicineSettings = ({
  user,
  saveMedicationSettings,
}: MedicineSettingsProps) => {
  const [medications, setMedicines] = useState<IMedication[]>(
    user.profile.medications
  );
  const [isAddingMedicine, setIsAddingMedicine] = useState(false);
  const [medicationError, setMedicationError] = useState('');

  const initialValues: IMedication = {
    category: '',
    name: '',
    dosage: 0,
    doseUnit: 'mg',
    frequency: '',
    times: [],
    notes: '',
    reminder: new Reminder(),
  };

  const abortAddingMedicine = () => {
    setIsAddingMedicine(false);
  };

  const handleChangeOnMedicationField = (
    value: string,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<IMedication>>
  ) => {
    const doMedicationAlreadyExist = user.profile.medications.find(
      (medication) => medication.name === value
    );
    if (doMedicationAlreadyExist) {
      setMedicationError('Medicinen finns redan i din lista');
    } else {
      setFieldValue('name', value);
      setMedicationError('');
    }
  };

  const saveSettings = async (
    newMedicines: IMedication[]
  ): Promise<IMedication[]> => {
    try {
      const updatedMedicines = await saveMedicationSettings(newMedicines);
      setMedicines(updatedMedicines);
      return updatedMedicines;
    } catch (err) {
      console.error('Could not save medications:', err);
      toast.error('Kunde inte spara mediciner');
      return newMedicines;
    }
  };

  const handleSubmit = async (values: IMedication) => {
    try {
      const newMedicine: IMedication = {
        category: values.category,
        name: values.name,
        dosage: Number(values.dosage),
        doseUnit: values.doseUnit,
        times: values.times || [],
        frequency: values.frequency,
        notes: values.notes,
        reminder: {
          enabled: Boolean(values.reminder.enabled),
          method: values.reminder.method || 'email',
          times: values.times || [],
          schedule: [],
          history: [],
        },
      };

      const newMedicines = [...medications, newMedicine];
      const updatedMedicines = await saveSettings(newMedicines);

      if (updatedMedicines) {
        setMedicines(updatedMedicines);
        setIsAddingMedicine(false);
        toast.success('Medicin tillagd');
      }
    } catch (error) {
      console.error('could not save medication:', error);
      toast.error('Kunde inte spara medicin');
    }
  };

  const handleDeleteMedicine = async (index: number) => {
    try {
      if (!user?.email) return;

      // Get latest medications
      const { data } = await axios.post('/api/get-medications', {
        email: user.email,
      });

      const latestMedications = data.medications;
      const deletedMedicine = latestMedications[index];

      // Collect all messageIds from both schedule and history
      const messageIds = [
        ...(deletedMedicine.reminder.schedule?.map(
          (s: ISchedule) => s.messageId
        ) || []),
        ...(deletedMedicine.reminder.history
          ?.filter((h: IHistory) => h.status === 'pending')
          .map((h: IHistory) => h.messageId) || []),
      ].filter(Boolean);

      // Delete all related QStash messages
      if (messageIds.length > 0) {
        await axios.post(
          '/api/delete-qstash',
          {
            messageIds,
            userId: user._id,
            medicationName: deletedMedicine.name,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Filter out the deleted medication
      const newMedicines = latestMedications.filter(
        (_: IMedication, i: number) => i !== index
      );

      const updatedMedicines = await saveSettings(newMedicines);

      if (updatedMedicines) {
        setMedicines(updatedMedicines);
        toast.success('Medicin borttagen');
      }
    } catch (error) {
      console.error('could not delete medication: ', error);
      toast.error('Kunde inte ta bort medicin');
    }
  };

  return (
    <div
      className="mx-auto max-w-7xl w-full bg-tertiary-light"
      aria-labelledby="medication-heading"
    >
      {!user?.isVerified && <VerficationMessage />}
      <div className="flex flex-col gap-3 text-center mb-8">
        <div className="flex items-center justify-center gap-3">
          <MdMedication className="w-8 h-8 text-primary-dark" />
          <h2
            id="medication-heading"
            className={`text-3xl font-semibold ${
              !user.isVerified ? 'text-gray-400' : 'text-primary-dark'
            }`}
          >
            Mediciner
          </h2>
        </div>
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
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-4">
              {medications.length === 0 ? (
                <>
                  <div className="text-center py-8">
                    <MdMedication className="mx-auto h-16 w-16 text-primary-medium mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-3">
                      Inga mediciner tillagda än
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Håll koll på dina mediciner genom att lägga till dem här.
                      Du kan enkelt hantera dosering, tider och påminnelser.
                    </p>
                    <button
                      className="primary-button inline-flex items-center gap-2 px-6 py-3"
                      onClick={() => setIsAddingMedicine(true)}
                    >
                      <FiPlusCircle className="w-5 h-5" />
                      Lägg till ny medicin
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
                    {[
                      {
                        icon: <FiList className="w-6 h-6" />,
                        title: 'Enkel översikt',
                        description:
                          'Få en tydlig översikt över alla dina mediciner på ett ställe.',
                      },
                      {
                        icon: <FiClock className="w-6 h-6" />,
                        title: 'Påminnelser',
                        description:
                          'Ställ in påminnelser så du aldrig missar en dos.',
                      },
                      {
                        icon: <FiShield className="w-6 h-6" />,
                        title: 'Säker hantering',
                        description:
                          'Din medicinska information hanteras säkert och privat.',
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="p-6 bg-primary-light rounded-lg text-center hover:bg-primary-light/80 transition-colors"
                      >
                        <div className="text-primary-dark mb-4 flex justify-center">
                          {feature.icon}
                        </div>
                        <h4 className="font-medium text-primary-dark mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  className="primary-button inline-flex items-center gap-2 px-6 py-3"
                  onClick={() => setIsAddingMedicine(true)}
                >
                  <FiPlusCircle className="w-5 h-5" />
                  Lägg till ny medicin
                </button>
              )}
            </div>
          </div>
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
                          options={MEDICATION_OPTIONS[
                            values.category as keyof typeof MEDICATION_OPTIONS
                          ].map((option) => ({
                            value: option.value,
                            label: option.label,
                          }))}
                          value={values.name}
                          onChange={(value: string) => {
                            handleChangeOnMedicationField(value, setFieldValue);
                          }}
                          name="name"
                          error={errors.name}
                          touched={touched.name}
                          size="large"
                          placeholder="Välj medicin..."
                        />
                        {medicationError && (
                          <p className="text-red-500 text-sm mt-2">
                            {medicationError}
                          </p>
                        )}
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
                                value={values.times[index] || ''}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setFieldValue(
                                    `times.${index}`,
                                    e.target.value
                                  );
                                }}
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
                <AddMedicationButtons
                  abortAddingMedication={abortAddingMedicine}
                />
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
