import { Medication } from './Medication';

export class Profile {
  constructor(
    public age: number = 0,
    public gender: string = '',
    public diagnosises: string[] = [],
    public medications: Medication[] = []
  ) {}
}
