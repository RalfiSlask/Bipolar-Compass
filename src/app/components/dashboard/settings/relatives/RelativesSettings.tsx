import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import VerficationMessage from '@/app/components/shared/VerficationMessage';
import { notificationFrequencies } from '@/app/data/notifications';
import { IRelative } from '@/app/types/relative';
import { IUser } from '@/app/types/user';
import { relativeValidationSchema } from '@/app/utils/validationSchemas';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  FiClock,
  FiMail,
  FiPlusCircle,
  FiShield,
  FiUserPlus,
  FiUsers,
} from 'react-icons/fi';
import RelativeDeleteConfirmationModal from './RelativeDeleteConfirmModal';

interface RelativesSettingsProps {
  user: IUser;
  saveRelativesSettings: (relatives: IRelative[]) => Promise<void>;
}

const RelativesSettings = ({
  user,
  saveRelativesSettings,
}: RelativesSettingsProps) => {
  const [relatives, setRelatives] = useState(user.settings.relatives);
  const [isAddingRelative, setIsAddingRelative] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRelativeIndex, setSelectedRelativeIndex] = useState<
    number | null
  >(null);

  const initialValues: IRelative = {
    email: '',
    email_enabled: false,
    email_frequency: 'weekly',
  };

  const handleSubmit = async (values: IRelative) => {
    const newRelatives = [...relatives, values];
    try {
      await saveRelativesSettings(newRelatives);
      setRelatives(newRelatives);
    } catch (err) {
      console.error('could not save the settings, ', err);
      toast.error('Kunde inte spara inställningar');
    }
    setIsAddingRelative(false);
    toast.success('Anhörig tillagd');
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
      await saveRelativesSettings(newRelatives);
      setRelatives(newRelatives);
      toast.success('Anhörig borttagen');
    } catch (err) {
      console.error('could not delete relative: ', err);
      toast.error('Kunde inte ta bort anhörig');
    }
    setDeleteModalOpen(false);
    setSelectedRelativeIndex(null);
  };

  return (
    <div
      className="mx-auto max-w-7xl w-full bg-tertiary-light"
      aria-labelledby="relatives-heading"
    >
      {!user?.isVerified && <VerficationMessage />}
      <div className="flex flex-col gap-3 text-center mb-8">
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
        {!isAddingRelative && (
          <div className="bg-white px-4 md:px-8 py-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-4">
              {relatives.length === 0 ? (
                <>
                  <div className="text-center py-8">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
                    {[
                      {
                        icon: <FiMail className="w-6 h-6" />,
                        title: 'E-postutskick',
                        description:
                          'Skicka automatiska uppdateringar till dina anhöriga via e-post.',
                      },
                      {
                        icon: <FiClock className="w-6 h-6" />,
                        title: 'Anpassad frekvens',
                        description:
                          'Välj hur ofta dina anhöriga ska få uppdateringar.',
                      },
                      {
                        icon: <FiShield className="w-6 h-6" />,
                        title: 'Säker hantering',
                        description:
                          'All kommunikation hanteras säkert och konfidentiellt.',
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
                  onClick={() => setIsAddingRelative(true)}
                >
                  <FiPlusCircle className="w-5 h-5" />
                  Lägg till anhörig
                </button>
              )}
            </div>
          </div>
        )}

        {isAddingRelative && (
          <Formik
            initialValues={initialValues}
            validationSchema={relativeValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form className="flex flex-col gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex flex-col gap-4">
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
                      <label htmlFor="email_enabled" className="text-gray-700">
                        Aktivera e-postutskick
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="primary-button">
                    Lägg till
                  </button>
                  <button
                    type="button"
                    className="tertiary-button"
                    onClick={() => setIsAddingRelative(false)}
                  >
                    Avbryt
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {!isAddingRelative && relatives.length > 0 && (
          <div className="bg-white px-4 md:px-6 py-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-center md:text-left text-base md:text-xl font-semibold mb-6 text-primary-dark">
              Registrerade anhöriga
            </h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {relatives.map((relative, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex flex-col-reverse items-center gap-2 md:flex-row justify-between md:items-start mb-4">
                    <div>
                      <h4 className="text-base md:text-lg font-medium text-gray-900">
                        {relative.email}
                      </h4>
                    </div>
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

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-base md:text-gray-500">Frekvens</p>
                      <p className="font-medium text-base md:text-gray-900">
                        {relative.email_frequency === 'weekly' && 'Varje vecka'}
                        {relative.email_frequency === 'biweekly' &&
                          'Varannan vecka'}
                        {relative.email_frequency === 'monthly' && 'Månadsvis'}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-base md:text-gray-500">Påminnelser</p>
                      <p className="font-medium text-base md:text-gray-900">
                        {relative.email_enabled ? (
                          <span className="text-green-600">Aktiverad</span>
                        ) : (
                          <span className="text-gray-400">Inaktiverad</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
