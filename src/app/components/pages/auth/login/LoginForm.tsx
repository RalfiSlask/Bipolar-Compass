'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Formik, Field, Form, ErrorMessage, FormikValues } from 'formik';
import { signInValidationSchema } from '@/app/utils/validationSchemas';
import { useRouter } from 'next/navigation';
import { ILoginFormValues } from '@/app/types/auth';

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
        setFormError('Användaren existerar inte. ' + signInResponse.error);
      } else {
        console.log('Login successful');
        router.push('/min-sida');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setFormError('Oväntat fel inträffade. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const initialInputValues: ILoginFormValues = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialInputValues}
      validationSchema={signInValidationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      {({ isValid }) => (
        <>
          <Form>
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

            <button
              className=""
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'Loggar in...' : 'Logga in'}
            </button>

            {formError && <p className="error">{formError}</p>}
          </Form>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
