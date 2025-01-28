import { ObjectId } from 'mongodb';
import { IMoodTrackerWeek } from './moodtracker';
import { IProfile } from './profile';
import { ISettings } from './settings';

export interface IUser {
  _id?: ObjectId;
  id?: string;
  name: string;
  email: string;
  password?: string;
  created_at: string;
  isVerified: boolean;
  verificationToken?: string;
  tokenExpires?: Date;
  resetToken?: string;
  resetTokenExpires?: Date;
  profile: IProfile;
  settings: ISettings;
}

export interface IUserWithMoodTracker extends IUser {
  moodTrackerData: IMoodTrackerWeek[];
}
