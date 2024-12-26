import { IRelative } from './relative';

export interface ISettings {
  preferred_language: string;
  notifications_enabled: boolean;
  relatives: IRelative[];
}
