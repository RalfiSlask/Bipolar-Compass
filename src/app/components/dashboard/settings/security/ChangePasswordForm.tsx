import PasswordStrengthIndicator from '@/app/components/pages/auth/register/PasswordStrengthIndicator';
import { SettingsContext } from '@/app/context/SettingsContext';
import { passwordChangeValidationSchema } from '@/app/utils/validationSchemas';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';

interface IPasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('ChangePasswordForm måste användas inom en SettingsProvider');
  }

  const { user } = context;

  const handleSubmit = async (values: IPasswordFormValues) => {
    try {
      setError(null);
      setSuccess(false);

      await axios.put('/api/settings/save/security/password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        email: user?.email,
      });

      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            'Ett fel uppstod vid uppdatering av lösenord'
        );
      } else {
        setError('Ett oväntat fel uppstod');
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Ändra lösenord</h2>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validationSchema={passwordChangeValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="currentPassword" className="text-sm">
                Nuvarande lösenord
              </label>
              <Field
                className="primary-input"
                name="currentPassword"
                type="password"
                id="currentPassword"
                placeholder="Ange nuvarande lösenord"
              />
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword" className="text-sm">
                Nytt lösenord
              </label>
              <Field
                className="primary-input"
                name="newPassword"
                type="password"
                id="newPassword"
                placeholder="Ange nytt lösenord"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-sm text-red-500"
              />
              <PasswordStrengthIndicator password={values.newPassword} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmNewPassword" className="text-sm">
                Bekräfta nytt lösenord
              </label>
              <Field
                className="primary-input"
                name="confirmNewPassword"
                type="password"
                id="confirmNewPassword"
                placeholder="Bekräfta nytt lösenord"
              />
              <ErrorMessage
                name="confirmNewPassword"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && (
              <p className="text-sm text-green-500">
                Lösenordet har uppdaterats!
              </p>
            )}

            <button type="submit" className="primary-button w-full">
              Uppdatera lösenord
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
