import * as Yup from 'yup';

export const registrationValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Namnet måste vara åtminstone 2 bokstäver')
    .required('Namn är obligatoriskt'),
  email: Yup.string()
    .email('Felaktigt e-mail format')
    .required('E-mail är obligatoriskt'),
  password: Yup.string()
    .required('Lösenord är obligatoriskt')
    .min(8, 'Lösenord måste vara åtminstone 8 tecken')
    .matches(/[A-Z]/, 'Lösenordet måste innehålla minst en stor bokstav')
    .matches(/[a-z]/, 'Lösenordet måste innehålla minst en liten bokstav')
    .matches(/[0-9]/, 'Lösenordet måste innehålla minst en siffra')
    .matches(
      /[^A-Za-z0-9]/,
      'Lösenordet måste innehålla minst ett specialtecken'
    ),
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
    .oneOf(
      ['Ej valt', 'Man', 'Kvinna', 'Annat', 'Vill ej ange'],
      'Ogiltigt kön val'
    )
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
  dosage: Yup.number()
    .required('Dosering är obligatoriskt')
    .moreThan(0, 'Dosering måste vara större än 0'),
  doseUnit: Yup.string()
    .required('Välj en enhet')
    .oneOf(['mg', 'ml', 'tabletter', 'droppar']),
  frequency: Yup.string().required('Frekvens är obligatoriskt'),
  times: Yup.array().when('frequency', {
    is: (frequency: string) =>
      frequency && frequency !== 'as_needed' && frequency !== '',
    then: (schema) =>
      schema
        .of(
          Yup.string()
            .required('Tidpunkt måste anges')
            .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Ogiltig tidpunkt')
        )
        .test('all-times-filled', 'Alla tidpunkter måste fyllas i', (value) =>
          value?.every((time) => !!time)
        ),
  }),
  notes: Yup.string().max(500, 'Anteckningar får inte överstiga 500 tecken'),
  reminder: Yup.object().shape({
    enabled: Yup.boolean(),
    method: Yup.string(),
    times: Yup.array().of(Yup.string()),
  }),
});

export const relativeValidationSchema = Yup.object().shape({
  email: Yup.string().email('Ogiltig e-postadress').required('E-post krävs'),
  email_frequency: Yup.string().required('Frekvens krävs'),
});

export const passwordChangeValidationSchema = Yup.object({
  currentPassword: Yup.string().required('Nuvarande lösenord krävs'),
  newPassword: Yup.string()
    .required('Nytt lösenord krävs')
    .min(8, 'Lösenord måste vara åtminstone 8 tecken')
    .matches(/[A-Z]/, 'Lösenordet måste innehålla minst en stor bokstav')
    .matches(/[a-z]/, 'Lösenordet måste innehålla minst en liten bokstav')
    .matches(/[0-9]/, 'Lösenordet måste innehålla minst en siffra')
    .matches(
      /[^A-Za-z0-9]/,
      'Lösenordet måste innehålla minst ett specialtecken'
    ),
  confirmNewPassword: Yup.string()
    .required('Du måste bekräfta det nya lösenordet')
    .oneOf([Yup.ref('newPassword')], 'Lösenorden matchar inte'),
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string().email('Ogiltig e-postadress').required('E-post krävs'),
});
