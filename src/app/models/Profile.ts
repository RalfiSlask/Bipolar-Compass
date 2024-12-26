import { Medication } from './Medication';
import { IProfile } from '../types/profile';

export class Profile implements IProfile {
  constructor(
    public age: number = 0,
    public gender: string = '',
    public diagnosises: string[] = [],
    public medications: Medication[] = []
  ) {}
}
