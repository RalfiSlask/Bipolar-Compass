import { IMedication } from './medication';

export interface IProfile {
  age: number;
  gender: string;
  diagnosis: string;
  medications: IMedication[];
}
