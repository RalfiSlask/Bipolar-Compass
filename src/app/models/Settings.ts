import { ISettings } from '../types/settings';
import { Relative } from './Relative';

export class Settings implements ISettings {
  constructor(
    public preferred_language: string = 'swe',
    public notifications_enabled: boolean = false,
    public relatives: Relative[] = []
  ) {}
}
