import crypto from 'crypto';
import { IUser } from '../types/user';
import { Profile } from './Profile';
import { Settings } from './Settings';

export class User extends Document implements IUser {
  readonly created_at: string = new Date().toISOString();
  isVerified: boolean = false;
  profile: Profile;
  settings: Settings;
  verificationToken?: string;
  tokenExpires?: Date;
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {
    super();
    this.profile = new Profile();
    this.settings = new Settings();
    this.generateVerificationToken();
  }

  private generateVerificationToken(): void {
    this.verificationToken = crypto.randomBytes(32).toString('hex');
    this.tokenExpires = new Date(Date.now() + 3600 * 1000);
  }

  /**
   * Serializes class instance
   * Removes the generateVerificationToken method
   * @returns {object}
   */
  toJSON(): object {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      created_at: this.created_at,
      isVerified: this.isVerified,
      verificationToken: this.verificationToken,
      tokenExpires: this.tokenExpires,
      profile: this.profile,
      settings: this.settings,
    };
  }
}
