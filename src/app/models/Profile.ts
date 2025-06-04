import { IProfile } from '../types/profile';
import { Medication } from './Medication';

export class Profile implements IProfile {
  constructor(
    public age: number = 0,
    public gender: string = '',
    public diagnosis: string = '',
    public medications: Medication[] = [],
    public avatarUrl: string = ''
  ) {}
}
