import { Profile } from './Profile';
import { Settings } from './Settings';

export class User {
  readonly created_at: string = new Date().toISOString();
  isVerified: boolean = false;
  profile: Profile;
  settings: Settings;

  constructor(
    public name: string,
    public email: string,
    public password: string,
    public verificationCode?: string
  ) {
    this.profile = new Profile();
    this.settings = new Settings();
  }
}
