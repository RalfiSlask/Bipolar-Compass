export interface IRelative {
  email: string;
  email_enabled: boolean;
  email_frequency: 'weekly' | 'biweekly' | 'monthly';
  type: 'parent' | 'child' | 'friend' | 'other';
  name: string;
}
