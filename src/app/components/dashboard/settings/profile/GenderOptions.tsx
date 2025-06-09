import { Field } from 'formik';

import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import { GENDER_OPTIONS } from '@/app/data/settings';
import { IProfileFormValues } from '@/app/types/profile';
import { ErrorMessage, FieldProps } from 'formik';

const GenderOptions = () => {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-base font-medium text-gray-900">Kön</legend>
      <div className="flex flex-col gap-1">
        <Field name="gender">
          {({ field, form }: FieldProps<string, IProfileFormValues>) => (
            <CustomSelect
              options={GENDER_OPTIONS}
              value={field.value}
              onChange={(value) => form.setFieldValue('gender', value)}
              name="gender"
              error={form.errors.gender}
              touched={form.touched.gender}
            />
          )}
        </Field>
        <ErrorMessage
          name="gender"
          component="span"
          className="text-red-500 text-sm block"
        />
      </div>
    </fieldset>
  );
};

export default GenderOptions;
