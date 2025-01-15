'use client';

import { forgotPasswordValidationSchema } from '@/app/utils/validationSchemas';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { useEffect, useState } from 'react';

const ForgetPasswordForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSendAgain, setCanSendAgain] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) =>
          prevCountdown !== null ? prevCountdown - 1 : null
        );
      }, 1000);
    } else if (countdown === 0) {
      setCanSendAgain(true);
      setCountdown(null);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const waitNinetySecondsBeforeSendingAgain = () => {
    setCanSendAgain(false);
    setCountdown(90);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 90000);
  };

  const handleSubmit = async (values: FormikValues) => {
    setFormError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/forgot-password', values);
      if (response.data.error) {
        setFormError(response.data.error);
      } else {
        setSuccessMessage('Instruktionerna har skickats till din e-post.');
        waitNinetySecondsBeforeSendingAgain();
      }
    } catch (error) {
      console.error('Error sending forgot password email:', error);
      setFormError('Ett oväntat fel inträffade. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const initialInputValues = {
    email: '',
  };

  return (
    <Formik
      initialValues={initialInputValues}
      validationSchema={forgotPasswordValidationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      {({ errors, touched }) => (
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

          <button
            type="submit"
            className={`w-full tertiary-button cursor-pointer ${
              isSubmitting || !canSendAgain
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={isSubmitting || !canSendAgain}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                Skickar...
              </span>
            ) : canSendAgain ? (
              'Skicka instruktioner'
            ) : (
              `Vänta ${countdown} sekunder`
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

export default ForgetPasswordForm;
