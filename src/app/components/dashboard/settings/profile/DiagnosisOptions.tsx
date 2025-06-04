import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import { DIAGNOSIS_OPTIONS } from '@/app/data/settings';
import { IProfileFormValues } from '@/app/types/profile';
import { ErrorMessage, Field, FieldProps } from 'formik';

const DiagnosisOptions = () => {
  return (
    <fieldset className="flex flex-col space-y-2">
      <legend className="text-base font-medium text-gray-900">Diagnos</legend>
      <div className="flex flex-col gap-1">
        <Field name="diagnosis" className="min-w-[200px]">
          {({ field, form }: FieldProps<string, IProfileFormValues>) => (
            <CustomSelect
              options={DIAGNOSIS_OPTIONS}
              value={field.value}
              onChange={(value) => form.setFieldValue('diagnosis', value)}
              name="diagnosis"
              size="large"
              error={form.errors.diagnosis}
              touched={form.touched.diagnosis}
            />
          )}
        </Field>
        <ErrorMessage
          name="diagnosis"
          component="span"
          className="text-red-500 text-sm block"
        />
      </div>
    </fieldset>
  );
};

export default DiagnosisOptions;
