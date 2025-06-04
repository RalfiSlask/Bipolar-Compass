import { IMedication } from './medication';

export interface IProfile {
  age: number;
  gender: string;
  diagnosis: string;
  medications: IMedication[];
  avatarUrl: string;
}

export interface IProfileFormValues {
  email: string;
  age: number;
  gender: string;
  diagnosis: string;
}
