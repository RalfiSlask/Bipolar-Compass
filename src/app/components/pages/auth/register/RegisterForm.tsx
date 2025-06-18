import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IRegisterFormValues } from '../../../../types/auth';
import { registrationValidationSchema } from '../../../../utils/schemas/validationSchemas';
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
      const response = await axios.post('/api/register', values);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        const signInResponse = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (signInResponse?.error) {
          toast.error('Registrering misslyckades: ' + signInResponse.error);
        } else {
          toast.success('Registrering lyckades');
          router.push('/konto/verifiera/skicka');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || 'Något gick fel. Försök igen senare.';
        toast.error(errorMessage);
      } else {
        console.error('An unexpected error occurred:', error);
        toast.error('Oväntat fel inträffade.');
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
        <Form noValidate className="flex flex-col gap-2 sm:gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-primary-dark">
              Namn
            </label>
            <Field
              className={`primary-input mt-2 ${
                errors.name && touched.name ? 'border-red-500' : ''
              }`}
              id="name"
              name="name"
              type="text"
              aria-required="true"
              aria-invalid={errors.name && touched.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            <div>
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-2"
                id="name-error"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-primary-dark">
              E-postadress
            </label>
            <Field
              className={`primary-input mt-2 ${
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
            <div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm mt-2"
                id="email-error"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium text-primary-dark">
              Lösenord
            </label>
            <Field
              className={`primary-input mt-2 ${
                errors.password && touched.password ? 'border-red-500' : ''
              }`}
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              aria-autocomplete="list"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                setPassword(e.target.value);
              }}
            />
            <div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm mt-2"
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
                  href="/om-oss/villkor"
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
            <div>
              <ErrorMessage
                name="acceptTerms"
                component="div"
                className="text-red-600 text-sm mt-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full primary-button cursor-pointer mt-2 sm:mt-4 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting || !isValid}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                Registrerar...
              </span>
            ) : (
              'Registrera'
            )}
          </button>

          <div>
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
