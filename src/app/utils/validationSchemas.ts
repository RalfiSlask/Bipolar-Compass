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
