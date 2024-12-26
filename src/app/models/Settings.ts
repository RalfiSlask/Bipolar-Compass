import { Relative } from './Relative';

export class Settings {
  constructor(
    public preferred_language: string = 'swe',
    public notifications_enabled: boolean = false,
    public relatives: Relative[] = []
  ) {}
}
