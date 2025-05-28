export interface IHealthcareProvider {
  email: string;
  email_enabled: boolean;
  email_frequency: 'weekly' | 'biweekly' | 'monthly';
  type: 'doctor' | 'psychologist' | 'psychiatrist' | 'nurse' | 'therapist' | 'counselor' | 'occupational_therapist' | 'case_manager' | 'other';
  name: string;
}
