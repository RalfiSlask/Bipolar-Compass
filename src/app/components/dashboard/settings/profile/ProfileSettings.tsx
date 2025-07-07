'use client';

import useSettingsContext from '@/app/hooks/useSettingsContext';
import { IProfileFormValues } from '@/app/types/profile';
import { getCreateDateAsMonthDayAndYear } from '@/app/utils/dateUtils';
import { userSettingsValidationSchema } from '@/app/utils/schemas/validationSchemas';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AgeOptions from './AgeOptions';
import AvatarContainer from './avatar/AvatarContainer';
import DiagnosisOptions from './DiagnosisOptions';
import EmailOptions from './EmailOptions';
import GenderOptions from './GenderOptions';

const ProfileSettings = () => {
  const { data: session, update: updateSession } = useSession();
  const [isEmailChangable, setIsEmailChangable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const context = useSettingsContext();

  const { user, saveProfileSettings } = context;

  const initialFormValues: IProfileFormValues = {
    email: user?.email ?? '',
    age: user?.profile?.age ?? 0,
    gender: user?.profile?.gender ?? 'Ej valt',
    diagnosis: user?.profile?.diagnosis ?? 'Ej valt',
  };

  const changeEmailChangable = () => {
    setIsEmailChangable(!isEmailChangable);
  };

  const handleSubmit = async (values: IProfileFormValues) => {
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
      toast.success('Inställningar sparade');
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error('Kunde inte spara inställningarna. Försök igen senare');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="max-w-3xl w-full p-4 sm:p-6 pb-16 flex flex-col items-center gap-10"
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

      <div className="w-full flex flex-col gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-6 pb-6 border-b border-gray-200">
            <AvatarContainer />
          </div>

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
              <Form className="flex flex-col gap-6">
                {saveError && (
                  <div className="text-red-500 text-sm" role="alert">
                    {saveError}
                  </div>
                )}
                <EmailOptions
                  errors={errors}
                  touched={touched}
                  isEmailChangable={isEmailChangable}
                  changeEmailChangable={changeEmailChangable}
                />
                <div className="flex flex-wrap gap-8">
                  <AgeOptions errors={errors} touched={touched} />
                  <GenderOptions />
                  <DiagnosisOptions />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto primary-button min-w-[180px]"
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
