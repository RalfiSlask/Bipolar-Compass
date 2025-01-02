import * as Yup from 'yup';

export const registrationValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Namnet måste vara åtminstone 2 bokstäver')
    .required('Namn är obligatoriskt'),
  email: Yup.string()
    .email('Felaktigt e-mail format')
    .required('E-mail är obligatoriskt'),
  password: Yup.string()
    .min(2, 'Lösenord måste vara åtminstone 8 karaktärer')
    .required('Lösenord är obligatoriskt'),
  acceptTerms: Yup.bool().oneOf([true], 'Du måste godkänna villkoren'),
});

export const signInValidationSchema = Yup.object({
  email: Yup.string()
    .email('Felaktigt e-mail format')
    .required('E-mail är obligatoriskt'),
  password: Yup.string()
    .min(2, 'Lösenord måste vara åtminstone 8 karaktärer')
    .required('Lösenord är obligatoriskt'),
});

export const userSettingsValidationSchema = Yup.object({
  email: Yup.string()
    .email('Felaktigt e-mail format')
    .required('E-mail är obligatoriskt'),
  age: Yup.number()
    .min(0, 'Ålder kan inte vara mindre än 0')
    .max(110, 'Ålder kan inte vara större än 110')
    .required('Ålder är obligatoriskt'),
  gender: Yup.string()
    .oneOf(['Ej valt', 'Man', 'Kvinna'], 'Ogiltigt kön val')
    .required('Kön är obligatoriskt'),
});
export const userPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .min(2, 'Lösenord måste vara åtminstone 8 karaktärer')
    .required('Lösenord är obligatoriskt'),
});

export const medicineValidationSchema = Yup.object({
  category: Yup.string()
    .required('Välj en kategori')
    .oneOf(
      ['moodStabilizers', 'antipsychotics', 'antidepressants'],
      'Välj en giltig kategori'
    ),
  name: Yup.string()
    .required('Välj en medicin')
    .when('category', {
      is: (category: string) => !!category,
      then: (schema) => schema.required('Välj en medicin för vald kategori'),
    }),
  dosage: Yup.string()
    .required('Dosering är obligatoriskt')
    .min(1, 'Ange en giltig dosering'),
  frequency: Yup.string()
    .required('Frekvens är obligatoriskt')
    .min(1, 'Ange en giltig frekvens'),
  notes: Yup.string().max(500, 'Anteckningar får inte överstiga 500 tecken'),
  reminder: Yup.boolean(),
});
