import { IProfileFormValues } from '@/app/types/profile';
import { ErrorMessage, Field, FormikErrors, FormikTouched } from 'formik';
import EmailChangeButton from './EmailChangeButton';

interface IEmailOptionsProps {
  errors: FormikErrors<IProfileFormValues>;
  touched: FormikTouched<IProfileFormValues>;
  isEmailChangable: boolean;
  changeEmailChangable: () => void;
}

const EmailOptions = ({
  errors,
  touched,
  isEmailChangable,
  changeEmailChangable,
}: IEmailOptionsProps) => {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="text-base font-medium text-gray-900">
        <label htmlFor="email">E-postadress</label>
      </legend>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="relative">
            <Field
              className={`primary-input w-full sm:w-[420px]  ${
                errors.email && touched.email ? 'border-red-500' : ''
              }`}
              name="email"
              type="email"
              id="email"
              placeholder="Din e-postadress"
              disabled={!isEmailChangable}
              aria-invalid={Boolean(errors.email && touched.email)}
            />
            <ErrorMessage
              name="email"
              component="span"
              className="text-red-500 text-sm mt-1 block"
            />
          </div>
          {!isEmailChangable && (
            <p className="text-sm text-gray-500 mt-2">
              Klicka på &quot;Ändra e-post&quot; för att uppdatera din
              e-postadress
            </p>
          )}
        </div>
        <EmailChangeButton
          isEmailChangable={isEmailChangable}
          changeEmailChangable={changeEmailChangable}
        />
      </div>
    </fieldset>
  );
};

export default EmailOptions;
