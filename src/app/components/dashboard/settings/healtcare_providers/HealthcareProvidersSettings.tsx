import CaregiverInfoContainer from '@/app/components/shared/CaregiverInfoContainer';
import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import VerficationMessage from '@/app/components/shared/VerficationMessage';
import {
  HEALTHCARE_PROVIDER_FEATURES,
  HEALTHCARE_PROVIDER_TYPES,
} from '@/app/data/dashboard/healtcareProviders';
import { NOTIFICATION_FREQUENCIES } from '@/app/data/dashboard/notifications';
import { IHealthcareProvider } from '@/app/types/healthcareProvider';
import { IUser } from '@/app/types/user';
import { relativeValidationSchema } from '@/app/utils/validationSchemas';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit, FiPlusCircle, FiUserPlus, FiUsers } from 'react-icons/fi';
import HealthcareProvidersDeleteConfirmationModal from './HealthcareProvidersDeleteConfirmModal';

interface HealthcareProvidersSettingsProps {
  user: IUser;
  saveHealthcareProvidersSettings: (
    healthcareProviders: IHealthcareProvider[],
    operation: 'add' | 'edit' | 'delete'
  ) => Promise<void>;
}

const HealthcareProvidersSettings = ({
  user,
  saveHealthcareProvidersSettings,
}: HealthcareProvidersSettingsProps) => {
  const [healthcareProviders, setHealthcareProviders] = useState<
    IHealthcareProvider[]
  >(user.settings.healthcare_providers || []);
  const [isAddingHealthcareProvider, setIsAddingHealthcareProvider] =
    useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedHealthcareProviderIndex, setSelectedHealthcareProviderIndex] =
    useState<number | null>(null);
  const [isEditingHealthcareProvider, setIsEditingHealthcareProvider] =
    useState(false);
  const [editingHealthcareProviderIndex, setEditingHealthcareProviderIndex] =
    useState<number | null>(null);

  const initialValues: IHealthcareProvider = {
    email: '',
    email_enabled: false,
    email_frequency: 'weekly',
    name: '',
    type: '',
  };

  const handleSubmit = async (values: IHealthcareProvider) => {
    let newHealthcareProviders;
    let operation: 'add' | 'edit';

    if (
      isEditingHealthcareProvider &&
      editingHealthcareProviderIndex !== null
    ) {
      newHealthcareProviders = healthcareProviders.map((provider, index) =>
        index === editingHealthcareProviderIndex ? values : provider
      );
      operation = 'edit';
    } else {
      newHealthcareProviders = [...healthcareProviders, values];
      operation = 'add';
    }

    try {
      await saveHealthcareProvidersSettings(newHealthcareProviders, operation);
      setHealthcareProviders(newHealthcareProviders);
    } catch (err) {
      console.error('could not save the settings, ', err);
      toast.error('Kunde inte spara inställningar');
    }
    setIsAddingHealthcareProvider(false);
    setIsEditingHealthcareProvider(false);
    setEditingHealthcareProviderIndex(null);
  };

  const handleDeleteHealthcareProvider = async (index: number) => {
    setSelectedHealthcareProviderIndex(index);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedHealthcareProviderIndex === null) return;

    try {
      const newHealthcareProviders = healthcareProviders.filter(
        (_, i) => i !== selectedHealthcareProviderIndex
      );
      await saveHealthcareProvidersSettings(newHealthcareProviders, 'delete');
      setHealthcareProviders(newHealthcareProviders);
    } catch (err) {
      console.error('could not delete healthcare provider: ', err);
      toast.error('Kunde inte ta bort vårdgivare');
    }
    setDeleteModalOpen(false);
    setSelectedHealthcareProviderIndex(null);
  };

  const handleEditHealthcareProvider = (index: number) => {
    setEditingHealthcareProviderIndex(index);
    setIsEditingHealthcareProvider(true);
    setIsAddingHealthcareProvider(false);
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
            Vårdgivare
          </h2>
        </div>
        <p
          className={`${!user.isVerified ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Hantera kontaktinformation och inställningar för dina vårdgivare.
        </p>
      </div>

      <div
        className={`w-full flex flex-col gap-6 ${
          !user.isVerified ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {!isAddingHealthcareProvider && !isEditingHealthcareProvider && (
          <div className="bg-white px-4 md:px-8 py-6 sm:py-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-4">
              {healthcareProviders.length === 0 ? (
                <>
                  <div className="text-center sm:py-8">
                    <FiUserPlus className="mx-auto h-16 w-16 text-primary-medium mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-3">
                      Inga vårdgivare tillagda än
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Lägg till vårdgivare som du vill ska få information om din
                      hälsa och medicinering.
                    </p>
                    <button
                      className="primary-button inline-flex items-center gap-2 px-6 py-3"
                      onClick={() => setIsAddingHealthcareProvider(true)}
                    >
                      <FiPlusCircle className="w-5 h-5" />
                      Lägg till vårdgivare
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 sm:mt-8 w-full">
                    {HEALTHCARE_PROVIDER_FEATURES.map((feature, index) => (
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
                  onClick={() => setIsAddingHealthcareProvider(true)}
                >
                  <FiPlusCircle className="w-5 h-5" />
                  Lägg till vårdgivare
                </button>
              )}
            </div>
          </div>
        )}

        {(isAddingHealthcareProvider || isEditingHealthcareProvider) && (
          <Formik
            initialValues={
              isEditingHealthcareProvider &&
              editingHealthcareProviderIndex !== null
                ? healthcareProviders[editingHealthcareProviderIndex]
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
                      Typ av vårdgivare
                    </label>
                    <CustomSelect
                      options={HEALTHCARE_PROVIDER_TYPES}
                      name="type"
                      value={values.type}
                      onChange={(value: string) => {
                        setFieldValue('type', value);
                      }}
                      placeholder="Välj typ av vårdgivare..."
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
                        options={Object.entries(NOTIFICATION_FREQUENCIES).map(
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
                    {isEditingHealthcareProvider ? 'Uppdatera' : 'Lägg till'}
                  </button>
                  <button
                    type="button"
                    className="tertiary-button"
                    onClick={() => {
                      setIsAddingHealthcareProvider(false);
                      setIsEditingHealthcareProvider(false);
                      setEditingHealthcareProviderIndex(null);
                    }}
                  >
                    Avbryt
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {!isAddingHealthcareProvider &&
          !isEditingHealthcareProvider &&
          healthcareProviders.length > 0 && (
            <div className="bg-white px-4 md:px-6 py-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-center md:text-left text-base md:text-xl font-semibold mb-6 text-primary-dark">
                Registrerade vårdgivare
              </h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {healthcareProviders.map((healthcareProvider, index) => {
                  const typeLabel =
                    HEALTHCARE_PROVIDER_TYPES.find(
                      (type) => type.value === healthcareProvider.type
                    )?.label || 'Typ saknas';
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <button
                          aria-label="Redigera vårdgivare"
                          onClick={() => handleEditHealthcareProvider(index)}
                        >
                          <FiEdit className="h-5 w-5 text-primary-dark hover:text-primary-medium transition-colors" />
                        </button>
                        <button
                          onClick={() => handleDeleteHealthcareProvider(index)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          aria-label="Ta bort vårdgivare"
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
                        caregiver={healthcareProvider}
                        typeLabel={typeLabel}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
      </div>

      <HealthcareProvidersDeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedHealthcareProviderIndex(null);
        }}
        onConfirm={handleConfirmDelete}
        healthcareProviderName={
          selectedHealthcareProviderIndex !== null
            ? healthcareProviders[selectedHealthcareProviderIndex]?.email ||
              'denna vårdgivare'
            : 'denna vårdgivare'
        }
      />
    </div>
  );
};

export default HealthcareProvidersSettings;
