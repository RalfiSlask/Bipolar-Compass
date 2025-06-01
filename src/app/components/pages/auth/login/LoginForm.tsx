'use client';

import { ILoginFormValues } from '@/app/types/auth';
import { signInValidationSchema } from '@/app/utils/validationSchemas';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import GoogleAuthButton from './GoogleAuthButton';
const LoginForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: FormikValues) => {
    setFormError(null);
    setIsSubmitting(true);

    try {
      const signInResponse = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (signInResponse?.error) {
        setFormError(signInResponse.error);
      } else {
        router.push('/min-sida');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setFormError('Oväntat fel inträffade. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setFormError(null);
    try {
      await signIn('google', { callbackUrl: '/min-sida' });
    } catch (error) {
      console.error('Google sign-in error:', error);
      setFormError('Google inloggning misslyckades. Försök igen.');
    }
  };

  const initialInputValues: ILoginFormValues = {
    email: '',
    password: '',
  };

  return (
    <div className="flex flex-col gap-4">
      <GoogleAuthButton handleGoogleSignIn={handleGoogleSignIn} />
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">eller</span>
        </div>
      </div>

      <Formik
        initialValues={initialInputValues}
        validationSchema={signInValidationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
      >
        {({ isValid, errors, touched }) => (
          <Form noValidate className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-primary-dark">
                E-postadress
              </label>
              <Field
                className={`primary-input ${
                  errors.email && touched.email ? 'border-red-500' : ''
                }`}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <div className="min-h-[20px]">
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm"
                  id="email-error"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-medium text-primary-dark"
              >
                Lösenord
              </label>
              <Field
                className={`primary-input w-full ${
                  errors.password && touched.password ? 'border-red-500' : ''
                }`}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-required="true"
                aria-invalid={
                  errors.password && touched.password ? 'true' : 'false'
                }
                aria-describedby={
                  errors.password ? 'password-error' : undefined
                }
              />
              <div className="min-h-[20px]">
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm"
                  id="password-error"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full primary-button cursor-pointer ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting || !isValid}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  Loggar in...
                </span>
              ) : (
                'Logga in'
              )}
            </button>

            <div className="min-h-[20px]">
              {formError && (
                <div role="alert" className="text-red-600 text-sm">
                  {formError}
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
