import { IRelative } from '../types/relative';
export class Relative implements IRelative {
  constructor(
    public email: string = '',
    public email_enabled: boolean = false,
    public email_frequency: 'weekly' | 'biweekly' | 'monthly' = 'weekly',
    public type: 'parent' | 'child' | 'doctor' | 'friend' | 'caregiver' | 'other' = 'other',
    public name: string = '',
  ) {}
}
