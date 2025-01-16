'use client';

import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import { SettingsContext } from '@/app/context/SettingsContext';
import { DIAGNOSIS_OPTIONS, GENDER_OPTIONS } from '@/app/data/settings';
import { getCreateDateAsMonthDayAndYear } from '@/app/utils/dateUtils';
import { userSettingsValidationSchema } from '@/app/utils/validationSchemas';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';

interface IFormValues {
  email: string;
  age: number;
  gender: string;
  diagnosis: string;
}

const ProfileSettings = () => {
  const { data: session, update: updateSession } = useSession();
  const [isEmailChangable, setIsEmailChangable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('ProfileSettings måste användas inom en SettingsProvider');
  }

  const { user, saveProfileSettings } = context;

  const initialFormValues: IFormValues = {
    email: user?.email ?? '',
    age: user?.profile?.age ?? 0,
    gender: user?.profile?.gender ?? 'Ej valt',
    diagnosis: user?.profile?.diagnosis ?? 'Ej valt',
  };

  const handleSubmit = async (values: IFormValues) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      await saveProfileSettings(values, user?.email ?? '');

      if (values.email !== user?.email) {
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            email: values.email,
          },
        });
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setSaveError('Kunde inte spara inställningarna. Försök igen senare');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="max-w-2xl w-full p-6 flex flex-col items-center gap-10"
      aria-labelledby="profile-heading"
    >
      <div className="flex flex-col gap-3 text-center">
        <h2
          id="profile-heading"
          className="text-3xl font-semibold text-primary-dark"
        >
          Profil
        </h2>
        <p className="text-sm text-gray-600">
          Hantera din personliga information och kontoinställningar.
        </p>
      </div>

      <div className="w-full space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-medium text-gray-500">Skapad</h3>
              <p className="text-gray-900">
                {getCreateDateAsMonthDayAndYear(user?.created_at ?? '')}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-medium text-gray-500">Namn</h3>
              <p className="text-gray-900">{user?.name ?? ''}</p>
            </div>
          </div>

          <Formik
            enableReinitialize
            initialValues={initialFormValues}
            validationSchema={userSettingsValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6">
                {saveError && (
                  <div className="text-red-500 text-sm" role="alert">
                    {saveError}
                  </div>
                )}

                <fieldset className="space-y-4">
                  <legend className="text-base font-medium text-gray-900">
                    E-postadress
                  </legend>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex-grow">
                      <div className="relative">
                        <Field
                          className={`primary-input w-full max-w-[420px]  ${
                            errors.email && touched.email
                              ? 'border-red-500'
                              : ''
                          }`}
                          name="email"
                          type="email"
                          id="email"
                          placeholder="Din e-postadress"
                          disabled={!isEmailChangable}
                          aria-invalid={Boolean(errors.email && touched.email)}
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-red-500 text-sm mt-1 block"
                        />
                      </div>
                      {!isEmailChangable && (
                        <p className="text-sm text-gray-500 mt-2">
                          Klicka på &quot;Ändra e-post&quot; för att uppdatera
                          din e-postadress
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      className={`whitespace-nowrap h-[42px] px-4 text-sm font-medium rounded-md border shadow-sm 
                        ${
                          isEmailChangable
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            : 'bg-white hover:bg-gray-50 text-gray-700'
                        }`}
                      onClick={() => setIsEmailChangable(!isEmailChangable)}
                    >
                      {isEmailChangable ? 'Avbryt' : 'Ändra e-post'}
                    </button>
                  </div>
                </fieldset>

                <div className="flex flex-wrap gap-8">
                  <fieldset className="flex flex-col space-y-2">
                    <legend className="text-base font-medium text-gray-900">
                      Ålder
                    </legend>
                    <div className="flex flex-col gap-1">
                      <Field
                        className={`primary-input w-full sm:w-[120px] ${
                          errors.age && touched.age
                            ? 'border-red-500'
                            : 'border-primary-border hover:border-primary-medium focus:border-primary-medium'
                        }`}
                        name="age"
                        type="number"
                        id="age"
                        min={0}
                        max={110}
                        aria-invalid={Boolean(errors.age && touched.age)}
                      />
                      <ErrorMessage
                        name="age"
                        component="span"
                        className="text-red-500 text-sm block"
                      />
                    </div>
                  </fieldset>

                  <fieldset className="flex flex-col space-y-2">
                    <legend className="text-base font-medium text-gray-900">
                      Kön
                    </legend>
                    <div className="flex flex-col gap-1">
                      <Field name="gender">
                        {({ field, form }: FieldProps<string, IFormValues>) => (
                          <CustomSelect
                            options={GENDER_OPTIONS}
                            value={field.value}
                            onChange={(value) =>
                              form.setFieldValue('gender', value)
                            }
                            name="gender"
                            error={form.errors.gender}
                            touched={form.touched.gender}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="span"
                        className="text-red-500 text-sm block"
                      />
                    </div>
                  </fieldset>

                  <fieldset className="flex flex-col space-y-2">
                    <legend className="text-base font-medium text-gray-900">
                      Diagnos
                    </legend>
                    <div className="flex flex-col gap-1">
                      <Field name="diagnosis">
                        {({ field, form }: FieldProps<string, IFormValues>) => (
                          <CustomSelect
                            options={DIAGNOSIS_OPTIONS}
                            value={field.value}
                            onChange={(value) =>
                              form.setFieldValue('diagnosis', value)
                            }
                            name="diagnosis"
                            error={form.errors.diagnosis}
                            touched={form.touched.diagnosis}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="diagnosis"
                        component="span"
                        className="text-red-500 text-sm block"
                      />
                    </div>
                  </fieldset>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto primary-button"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Sparar...' : 'Spara ändringar'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
