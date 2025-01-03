'use client';

import VerficationMessage from '@/app/components/shared/VerficationMessage';
import { SettingsContext } from '@/app/context/SettingsContext';
import { IUser } from '@/app/types/user';
import { getCreateDateAsMonthDayAndYear } from '@/app/utils/dateUtils';
import { userSettingsValidationSchema } from '@/app/utils/validationSchemas';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';

interface IProfileSettingsProps {
  userData: IUser;
}

const ProfileSettings = ({ userData }: IProfileSettingsProps) => {
  const { data: session, update: updateSession } = useSession();
  const [user, setUser] = useState<IUser>(userData);
  const [isEmailChangable, setIsEmailChangable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('ProfileSettings måste användas inom en SettingsProvider');
  }

  const { saveProfileSettings } = context;

  interface IFormValues {
    email: string;
    age: number;
    gender: string;
  }

  const initialFormValues: IFormValues = {
    email: user.email || '',
    age: user.profile?.age || 0,
    gender: user.profile?.gender || 'Ej valt',
  };

  const handleSubmit = async (values: IFormValues) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const updatedUser = await saveProfileSettings(values, user.email);

      setUser(updatedUser);

      if (values.email !== user.email) {
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            email: values.email,
          },
        });
      }
    } catch (error) {
      console.error('error in saving profile settings: ', error);
      setSaveError('Kunde inte spara inställningarna. Försök igen senare');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section
      className="max-w-2xl flex flex-col gap-8"
      aria-labelledby="profile-heading"
    >
      {!user.isVerified && <VerficationMessage />}
      <h1 id="profile-heading" className="text-2xl font-semibold">
        Profilinställningar
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-gray-500">Skapad</h3>
          <p>{getCreateDateAsMonthDayAndYear(user.created_at)}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-gray-500">Namn</h3>
          <p>{user.name}</p>
        </div>
      </div>

      {user ? (
        <Formik
          enableReinitialize
          initialValues={initialFormValues}
          validationSchema={userSettingsValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-6">
              {saveError && (
                <div className="text-red-500 text-sm" role="alert">
                  {saveError}
                </div>
              )}
              <div className="flex flex-col gap-6">
                <fieldset>
                  <legend className="font-medium mb-2">E-postadress</legend>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex flex-col gap-2">
                      <Field
                        className={`primary-input w-full sm:w-[300px] ${
                          errors.email && touched.email ? 'border-red-500' : ''
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
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => setIsEmailChangable(!isEmailChangable)}
                    >
                      {isEmailChangable ? 'Avbryt' : 'Ändra e-post'}
                    </button>
                  </div>
                </fieldset>

                <div className="flex flex-col sm:flex-row gap-6">
                  <fieldset>
                    <legend className="font-medium mb-2">Ålder</legend>
                    <div className="flex flex-col gap-2">
                      <Field
                        className={`primary-input w-full sm:w-[100px] ${
                          errors.age && touched.age ? 'border-red-500' : ''
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
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="font-medium mb-2">Kön</legend>
                    <div className="flex flex-col gap-2">
                      <Field
                        as="select"
                        className={`primary-input w-full sm:w-[160px] ${
                          errors.gender && touched.gender
                            ? 'border-red-500'
                            : ''
                        }`}
                        name="gender"
                        id="gender"
                        aria-invalid={Boolean(errors.gender && touched.gender)}
                      >
                        <option value="Ej valt">Ej valt</option>
                        <option value="Man">Man</option>
                        <option value="Kvinna">Kvinna</option>
                        <option value="Annat">Annat</option>
                        <option value="Vill ej ange">Vill ej ange</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="span"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </fieldset>
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto tertiary-button"
                disabled={isSaving}
              >
                {isSaving ? 'Sparar...' : 'Spara ändringar'}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <p className="text-center text-red-500" role="alert">
          Kunde inte hämta användardata. Försök igen senare.
        </p>
      )}
    </section>
  );
};

export default ProfileSettings;
