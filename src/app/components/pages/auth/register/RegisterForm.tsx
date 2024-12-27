import { Formik, Field, Form, ErrorMessage, FormikValues } from 'formik';
import { IRegisterFormValues } from '@/app/types/auth';
import { registrationValidationSchema } from '@/app/utils/validationSchemas';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';

const RegisterForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        console.error('Axios error:', error.message);
        setFormError('Något gick fel. Försök igen senare.');
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
      {({ isValid }) => (
        <Form>
          <div>
            <label htmlFor="name">Namn</label>
            <Field className="text-black" name="name" type="text" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field className="text-black" name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="password">Lösenord</label>
            <Field className="text-black" name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div>
            <label>
              <Field type="checkbox" name="acceptTerms" />
              Jag godkänner{' '}
              <Link href="/om-oss/anvandar-villkor">villkoren</Link> och{' '}
              <Link href="/om-oss/integritetspolicy">integritetspolicyn</Link>
            </label>
            <ErrorMessage
              name="acceptTerms"
              component="div"
              className="error"
            />
          </div>
          <button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Registrerar...' : 'Registrera'}
          </button>
          {formError && <p className="error">{formError}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
