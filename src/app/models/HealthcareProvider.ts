import { IHealthcareProvider } from "../types/healthcareProvider";

export class HealthcareProvider implements IHealthcareProvider {
  constructor(
    public email: string = '',
    public email_enabled: boolean = false,
    public email_frequency: 'weekly' | 'biweekly' | 'monthly' = 'weekly',
    public type: 'doctor' | 'psychologist' | 'psychiatrist' | 'nurse' | 'therapist' | 'counselor' | 'occupational_therapist' | 'case_manager' | 'other',
    public name: string = '',
  ) {}
}
