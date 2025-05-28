import { ISettings } from '../types/settings';
import { HealthcareProvider } from './HealthcareProvider';
import { Relative } from './Relative';

export class Settings implements ISettings {
  constructor(
    public preferred_language: string = 'swe',
    public notifications_enabled: boolean = false,
    public relatives: Relative[] = [],
    public healthcare_providers: HealthcareProvider[] = []
  ) {}
}
