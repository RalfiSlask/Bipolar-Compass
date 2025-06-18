'use client';

import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { useState } from 'react';
import { contactValidationSchema } from '../../../utils/schemas/validationSchemas';

interface IContactFormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const initialInputValues: IContactFormValues = {
    name: '',
    email: '',
    message: '',
  };

  const handleSubmit = async (values: FormikValues) => {
    setFormError(null);
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await axios.post('/api/contact', values);

      if (response.data.error) {
        setFormError(response.data.error);
      } else {
        setSubmitSuccess(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || 'Något gick fel. Försök igen senare.';
        setFormError(errorMessage);
      } else {
        setFormError('Ett oväntat fel inträffade.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialInputValues}
      validationSchema={contactValidationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      {({ isValid, errors, touched }) => (
        <Form noValidate className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-tertiary-dark">
              Namn
            </label>
            <Field
              className={`secondary-input w-full text-base  ${
                errors.name && touched.name ? 'border-red-500' : ''
              }`}
              id="name"
              name="name"
              type="text"
              placeholder="Ditt namn"
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
            <label htmlFor="email" className="font-medium text-tertiary-dark">
              E-postadress
            </label>
            <Field
              className={`secondary-input w-full text-base ${
                errors.email && touched.email ? 'border-red-500' : ''
              }`}
              id="email"
              name="email"
              type="email"
              placeholder="Din e-postadress"
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
            <label htmlFor="message" className="font-medium text-tertiary-dark">
              Meddelande
            </label>
            <Field
              as="textarea"
              id="message"
              name="message"
              placeholder="Ditt meddelande"
              className="w-full p-3 secondary-input resize-none min-h-[225px] "
              aria-required="true"
              aria-invalid={
                errors.message && touched.message ? 'true' : 'false'
              }
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            <div className="min-h-[20px]">
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-600 text-sm"
                id="message-error"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full tertiary-button disabled:opacity-50 disabled:cursor-not-allowed ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting || !isValid}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Skickar...' : 'Skicka meddelande'}
          </button>

          <div className="min-h-[20px]">
            {formError && (
              <div role="alert" className="text-red-600 text-sm">
                {formError}
              </div>
            )}
            {submitSuccess && (
              <div role="alert" className="text-green-600 text-sm">
                Tack för ditt meddelande! Vi återkommer så snart som möjligt.
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
