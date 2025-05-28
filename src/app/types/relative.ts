export interface IRelative {
  email: string;
  email_enabled: boolean;
  email_frequency: 'weekly' | 'biweekly' | 'monthly';
  type: 'parent' | 'child' | 'doctor' | 'friend' | 'caregiver' | 'other';
  name: string;
}
