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

  return (
    <div className="max-w-2xl py-6">
      <h2 className="text-2xl font-semibold mb-6">Anhöriga</h2>
      <p className="mb-4">Här kan du lägga till dina anhörigas uppgifter</p>

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
                    <label className="font-medium">Frekvens för utskick</label>
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
          <h3 className="text-lg font-semibold mb-4">Registrerade anhöriga</h3>
          <div className="flex flex-col gap-4">
            {relatives.map((relative, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex flex-col gap-2">
                  <p className="font-medium">{relative.email}</p>
                  <p className="text-sm text-gray-600">
                    Frekvens:{' '}
                    {relative.email_frequency === 'weekly'
                      ? 'Varje vecka'
                      : relative.email_frequency === 'biweekly'
                      ? 'Varannan vecka'
                      : 'Månadsvis'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status:{' '}
                    {relative.email_enabled ? 'Aktiverad' : 'Inaktiverad'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelativesSettings;
