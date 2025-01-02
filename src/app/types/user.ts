import { IProfile } from './profile';
import { ISettings } from './settings';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  created_at: string;
  isVerified: boolean;
  verificationToken?: string;
  tokenExpires?: Date;
  profile: IProfile;
  settings: ISettings;
}
