import VerficationMessage from '@/app/components/shared/VerficationMessage';
import useSettingsContext from '@/app/hooks/useSettingsContext';
import { IRelative } from '@/app/types/relative';
import { relativeValidationSchema } from '@/app/utils/validationSchemas';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

const RelativesSettings = () => {
  const { user, saveRelativesSettings } = useSettingsContext();

  if (!user) {
    throw new Error('Användardata saknas');
  }

  const [relatives, setRelatives] = useState(user.settings.relatives);
  const [isAddingRelative, setIsAddingRelative] = useState(false);

  const initialValues: IRelative = {
    email: '',
    email_enabled: false,
    email_frequency: 'weekly',
  };

  const handleSubmit = async (values: IRelative) => {
    const newRelatives = [...relatives, values];
    try {
      await saveRelativesSettings(newRelatives, user.email);
      setRelatives(newRelatives);
    } catch (err) {
      console.error('could not save settings: ', err);
    }
    setIsAddingRelative(false);
  };

  const handleDeleteRelative = async (index: number) => {
    try {
      const newRelatives = relatives.filter((_, i) => i !== index);
      await saveRelativesSettings(newRelatives, user.email);
      setRelatives(newRelatives);
    } catch (err) {
      console.error('could not delete relative: ', err);
    }
  };

  return (
    <div
      className="max-w-2xl w-full p-6 flex flex-col items-center gap-10"
      aria-labelledby="relatives-heading"
    >
      {!user?.isVerified && <VerficationMessage />}
      <div className="flex flex-col gap-3 text-center">
        <h2
          id="relatives-heading"
          className={`text-3xl font-semibold ${
            !user.isVerified ? 'text-gray-400' : 'text-primary-dark'
          }`}
        >
          Anhöriga
        </h2>
        <p
          className={`text-sm ${
            !user.isVerified ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Hantera kontaktinformation och inställningar för dina anhöriga.
        </p>
      </div>

      <div
        className={`w-full flex flex-col gap-6 ${
          !user.isVerified ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {!isAddingRelative && (
          <button
            className="primary-button"
            onClick={() => setIsAddingRelative(true)}
          >
            Lägg till anhörig
          </button>
        )}

        {isAddingRelative && (
          <Formik
            initialValues={initialValues}
            validationSchema={relativeValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex flex-col gap-4">
                    <label className="block text-lg font-medium mb-2">
                      E-postadress
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="secondary-input"
                      placeholder="namn@exempel.se"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    )}

                    <div className="flex flex-col gap-4">
                      <label className="font-medium">
                        Frekvens för utskick
                      </label>
                      <Field
                        as="select"
                        name="email_frequency"
                        className="primary-dropdown"
                      >
                        <option value="">Välj frekvens...</option>
                        <option value="weekly">Varje vecka</option>
                        <option value="biweekly">Varannan vecka</option>
                        <option value="monthly">Månadsvis</option>
                      </Field>
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
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Registrerade anhöriga
            </h3>
            <div className="grid gap-4">
              {relatives.map((relative, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
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
                      <p className="text-gray-500">Frekvens</p>
                      <p className="font-medium">
                        {relative.email_frequency === 'weekly' && 'Varje vecka'}
                        {relative.email_frequency === 'biweekly' &&
                          'Varannan vecka'}
                        {relative.email_frequency === 'monthly' && 'Månadsvis'}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500">Påminnelser</p>
                      <p className="font-medium">
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
    </div>
  );
};

export default RelativesSettings;
