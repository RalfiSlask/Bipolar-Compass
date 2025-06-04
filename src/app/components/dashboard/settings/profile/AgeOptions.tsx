import { IProfileFormValues } from '@/app/types/profile';
import { ErrorMessage, Field, FormikErrors, FormikTouched } from 'formik';

interface IAgeOptionsProps {
  errors: FormikErrors<IProfileFormValues>;
  touched: FormikTouched<IProfileFormValues>;
}

const AgeOptions = ({ errors, touched }: IAgeOptionsProps) => {
  return (
    <fieldset className="flex flex-col space-y-2">
      <legend className="text-base font-medium text-gray-900">
        <label htmlFor="age">Ålder</label>
      </legend>
      <div className="flex flex-col gap-1">
        <Field
          className={`primary-input w-full sm:w-[120px] ${
            errors.age && touched.age ? 'border-red-500' : ''
          }`}
          name="age"
          type="number"
          id="age"
          min={0}
          max={110}
          aria-invalid={Boolean(errors.age && touched.age)}
        />
        <ErrorMessage
          name="age"
          component="span"
          className="text-red-500 text-sm block"
        />
      </div>
    </fieldset>
  );
};

export default AgeOptions;
