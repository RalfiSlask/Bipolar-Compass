import { IMedication } from './medication';

export interface IProfile {
  age: number;
  gender: string;
  diagnosises: string[];
  medications: IMedication[];
}
