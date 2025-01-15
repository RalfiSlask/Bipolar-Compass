"use client"

import { userPasswordValidationSchema } from '@/app/utils/validationSchemas';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';
import { useState } from 'react';
import PasswordStrengthIndicator from '../register/PasswordStrengthIndicator';

const ResetPasswordForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');

  const initialInputValues = {
    password: '',
  };

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (values: FormikValues) => {
    setFormError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/reset-password', {
        ...values,
        token: token,
      });
      if (response.data.error) {
        setFormError(response.data.error);
      } else {
        setSuccessMessage('Ditt lösenord har blivit återställt.');
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setFormError('Ett oväntat fel inträffade. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialInputValues}
      validationSchema={userPasswordValidationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      {({ isValid, errors, touched, handleChange }) => (
        <Form noValidate className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium text-primary-dark">
              Nytt Lösenord
            </label>
            <div className="relative">
              <Field
                className={`block w-full px-4 py-3 rounded-lg border primary-input text-base ${
                  errors.password && touched.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-primary'
                } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="min-h-[20px]">
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm"
                id="password-error"
              />
            </div>
            <PasswordStrengthIndicator password={password} />
          </div>

          <button
            type="submit"
            className={`w-full tertiary-button ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting || !isValid}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                Återställer...
              </span>
            ) : (
              'Återställ Lösenord'
            )}
          </button>

          <div className="min-h-[20px]">
            {formError && (
              <div role="alert" className="text-red-600 text-sm">
                {formError}
              </div>
            )}
            {successMessage && (
              <div role="alert" className="text-green-600 text-sm">
                {successMessage}
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
