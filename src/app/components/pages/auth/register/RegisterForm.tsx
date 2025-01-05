import Spinner from '@/app/components/shared/Spinner';
import { IRegisterFormValues } from '@/app/types/auth';
import { registrationValidationSchema } from '@/app/utils/validationSchemas';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const RegisterForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  const initialInputValues: IRegisterFormValues = {
    name: '',
    email: '',
    password: '',
    acceptTerms: false,
  };

  const handleSubmit = async (values: FormikValues) => {
    setFormError(null);
    setIsSubmitting(true);
    try {
      console.log('Submitted values:', values);
      const response = await axios.post('/api/register', values);
      console.log('Server response:', response.data);

      if (response.data.error) {
        setFormError(response.data.error);
      } else {
        const signInResponse = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (signInResponse?.error) {
          setFormError('Inloggning misslyckades: ' + signInResponse.error);
        } else {
          console.log('Login successful');
          router.push('/min-sida');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || 'Något gick fel. Försök igen senare.';
        setFormError(errorMessage);
      } else {
        console.error('An unexpected error occurred:', error);
        setFormError('Oväntat fel inträffade.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialInputValues}
      validationSchema={registrationValidationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      {({ isValid, errors, touched, handleChange }) => (
        <Form noValidate className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-primary-dark">
              Namn
            </label>
            <Field
              className={`primary-input w-full text-base ${
                errors.name && touched.name ? 'border-red-500' : ''
              }`}
              id="name"
              name="name"
              type="text"
              aria-required="true"
              aria-invalid={errors.name && touched.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            <div className="min-h-[20px]">
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm"
                id="name-error"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-primary-dark">
              E-postadress
            </label>
            <Field
              className={`primary-input w-full text-base ${
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

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium text-primary-dark">
              Lösenord
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

          <div className="form-group">
            <label className="flex items-start gap-3 select-none">
              <Field
                type="checkbox"
                name="acceptTerms"
                className="w-[20px] h-[20px] rounded-md bg-white"
              />
              <span className="text-sm text-gray-600">
                Jag godkänner{' '}
                <Link
                  href="/om-oss/anvandar-villkor"
                  className="text-primary-dark hover:underline"
                >
                  villkoren
                </Link>{' '}
                och{' '}
                <Link
                  href="/om-oss/integritetspolicy"
                  className="text-primary-dark hover:underline"
                >
                  integritetspolicyn
                </Link>
              </span>
            </label>
            <div className="min-h-[20px] mt-2 text-center">
              <ErrorMessage
                name="acceptTerms"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
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
                <Spinner /> Registrerar...
              </span>
            ) : (
              'Registrera'
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
  );
};

export default RegisterForm;
