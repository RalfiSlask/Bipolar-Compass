import CaregiverInfoContainer from '@/app/components/shared/CaregiverInfoContainer';
import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import VerficationMessage from '@/app/components/shared/VerficationMessage';
import { notificationFrequencies } from '@/app/data/notifications';
import { RELATIVE_FEATURES, RELATIVE_TYPES } from '@/app/data/relatives';
import { IRelative } from '@/app/types/relative';
import { IUser } from '@/app/types/user';
import { getLabelByValue } from '@/app/utils/generalUtils';
import { relativeValidationSchema } from '@/app/utils/validationSchemas';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit, FiPlusCircle, FiUserPlus, FiUsers } from 'react-icons/fi';
import RelativeDeleteConfirmationModal from './RelativeDeleteConfirmModal';

interface RelativesSettingsProps {
  user: IUser;
  saveRelativesSettings: (
    relatives: IRelative[],
    operation: 'add' | 'edit' | 'delete'
  ) => Promise<void>;
}

const RelativesSettings = ({
  user,
  saveRelativesSettings,
}: RelativesSettingsProps) => {
  const [relatives, setRelatives] = useState<IRelative[]>(
    user.settings.relatives || []
  );
  const [isAddingRelative, setIsAddingRelative] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRelativeIndex, setSelectedRelativeIndex] = useState<
    number | null
  >(null);
  const [isEditingRelative, setIsEditingRelative] = useState(false);
  const [editingRelativeIndex, setEditingRelativeIndex] = useState<
    number | null
  >(null);

  const initialValues: IRelative = {
    email: '',
    email_enabled: false,
    email_frequency: 'weekly',
    name: '',
    type: '',
  };

  const handleSubmit = async (values: IRelative) => {
    let newRelatives;
    let operation: 'add' | 'edit';

    if (isEditingRelative && editingRelativeIndex !== null) {
      newRelatives = relatives.map((relative, index) =>
        index === editingRelativeIndex ? values : relative
      );
      operation = 'edit';
    } else {
      newRelatives = [...relatives, values];
      operation = 'add';
    }

    try {
      await saveRelativesSettings(newRelatives, operation);
      setRelatives(newRelatives);
    } catch (err) {
      console.error('could not save the settings, ', err);
      toast.error('Kunde inte spara inställningar');
    }
    setIsAddingRelative(false);
    setIsEditingRelative(false);
    setEditingRelativeIndex(null);
  };

  const handleDeleteRelative = async (index: number) => {
    setSelectedRelativeIndex(index);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedRelativeIndex === null) return;

    try {
      const newRelatives = relatives.filter(
        (_, i) => i !== selectedRelativeIndex
      );
      await saveRelativesSettings(newRelatives, 'delete');
      setRelatives(newRelatives);
    } catch (err) {
      console.error('could not delete relative: ', err);
      toast.error('Kunde inte ta bort anhörig');
    }
    setDeleteModalOpen(false);
    setSelectedRelativeIndex(null);
  };

  const handleEditRelative = (index: number) => {
    setEditingRelativeIndex(index);
    setIsEditingRelative(true);
    setIsAddingRelative(false);
  };

  return (
    <div
      className="mx-auto max-w-7xl w-full bg-tertiary-light"
      aria-labelledby="relatives-heading"
    >
      <div className="flex flex-col gap-3 text-center mb-8 items-center">
        {!user?.isVerified && <VerficationMessage />}
        <div className="flex items-center justify-center gap-3">
          <FiUsers className="w-8 h-8 text-primary-dark" />
          <h2
            id="relatives-heading"
            className={`text-3xl font-semibold ${
              !user.isVerified ? 'text-gray-400' : 'text-primary-dark'
            }`}
          >
            Anhöriga
          </h2>
        </div>
        <p
          className={`${!user.isVerified ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Hantera kontaktinformation och inställningar för dina anhöriga.
        </p>
      </div>

      <div
        className={`w-full space-y-6 ${
          !user.isVerified ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {!isAddingRelative && !isEditingRelative && (
          <div className="bg-white px-4 md:px-8 py-6 sm:py-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-4">
              {relatives.length === 0 ? (
                <>
                  <div className="text-center sm:py-8">
                    <FiUserPlus className="mx-auto h-16 w-16 text-primary-medium mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-3">
                      Inga anhöriga tillagda än
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Lägg till anhöriga som du vill ska få information om din
                      hälsa och medicinering.
                    </p>
                    <button
                      className="primary-button inline-flex items-center gap-2 px-6 py-3"
                      onClick={() => setIsAddingRelative(true)}
                    >
                      <FiPlusCircle className="w-5 h-5" />
                      Lägg till anhörig
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 sm:mt-8 w-full">
                    {RELATIVE_FEATURES.map((feature, index) => (
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
                  onClick={() => setIsAddingRelative(true)}
                >
                  <FiPlusCircle className="w-5 h-5" />
                  Lägg till anhörig
                </button>
              )}
            </div>
          </div>
        )}

        {(isAddingRelative || isEditingRelative) && (
          <Formik
            initialValues={
              isEditingRelative && editingRelativeIndex !== null
                ? relatives[editingRelativeIndex]
                : initialValues
            }
            validationSchema={relativeValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form className="flex flex-col gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex flex-col gap-4">
                    <label className="block text-lg font-medium mb-2">
                      Namn
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="primary-input"
                      placeholder="Ange namn"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 text-sm">{errors.name}</div>
                    )}

                    <label className="block text-lg font-medium mb-2">
                      Typ av anhörig
                    </label>
                    <CustomSelect
                      options={RELATIVE_TYPES}
                      name="type"
                      value={values.type}
                      onChange={(value: string) => {
                        setFieldValue('type', value);
                      }}
                      placeholder="Välj typ av anhörig..."
                      error={errors.type}
                      touched={touched.type}
                      size="large"
                    />
                    {errors.type && touched.type && (
                      <div className="text-red-500 text-sm">{errors.type}</div>
                    )}

                    <label className="block text-lg font-medium mb-2">
                      E-postadress
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="primary-input"
                      placeholder="namn@exempel.se"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    )}

                    <div className="flex flex-col gap-4">
                      <label className="font-medium">
                        Frekvens för utskick
                      </label>
                      <CustomSelect
                        options={Object.entries(notificationFrequencies).map(
                          ([key, value]) => ({
                            value: key,
                            label: value,
                          })
                        )}
                        name="email_frequency"
                        value={values.email_frequency}
                        onChange={(value: string) => {
                          setFieldValue('email_frequency', value);
                        }}
                        placeholder="Välj frekvens..."
                        error={errors.email_frequency}
                        touched={touched.email_frequency}
                        size="large"
                      />
                      {errors.email_frequency && touched.email_frequency && (
                        <div className="text-red-500 text-sm">
                          {errors.email_frequency}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Field
                        type="checkbox"
                        id="email_enabled"
                        name="email_enabled"
                        className="primary-checkbox"
                      />
                      <label htmlFor="email_enabled" className="text-dark">
                        Aktivera e-postutskick
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center md:justify-start gap-4 mb-16">
                  <button type="submit" className="primary-button">
                    {isEditingRelative ? 'Uppdatera' : 'Lägg till'}
                  </button>
                  <button
                    type="button"
                    className="tertiary-button"
                    onClick={() => {
                      setIsAddingRelative(false);
                      setIsEditingRelative(false);
                      setEditingRelativeIndex(null);
                    }}
                  >
                    Avbryt
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {!isAddingRelative && !isEditingRelative && relatives.length > 0 && (
          <div className="bg-white px-4 md:px-6 py-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-center md:text-left text-base md:text-xl font-semibold mb-6 text-primary-dark">
              Registrerade anhöriga
            </h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {relatives.map((relative, index) => {
                const typeLabel = getLabelByValue(
                  relative.type,
                  RELATIVE_TYPES
                );
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <button
                        aria-label="Redigera anhörig"
                        onClick={() => handleEditRelative(index)}
                      >
                        <FiEdit className="h-5 w-5 text-primary-dark hover:text-primary-medium transition-colors" />
                      </button>
                      <button
                        onClick={() => handleDeleteRelative(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        aria-label="Ta bort anhörig"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <CaregiverInfoContainer
                      caregiver={relative}
                      typeLabel={typeLabel}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <RelativeDeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedRelativeIndex(null);
        }}
        onConfirm={handleConfirmDelete}
        relativeName={
          selectedRelativeIndex !== null
            ? relatives[selectedRelativeIndex]?.email || 'denna anhörig'
            : 'denna anhörig'
        }
      />
    </div>
  );
};

export default RelativesSettings;
