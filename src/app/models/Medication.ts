import { IMedication, IReminder } from '../types/medication';

export class Medication implements IMedication {
  constructor(
    public name: string = '',
    public dosage: string = '',
    public frequency: string = '',
    public notes: string = '',
    public reminder: Reminder = new Reminder()
  ) {}
}

export class Reminder implements IReminder {
  constructor(
    public enabled: boolean = false,
    public method: string = '',
    public time: string = ''
  ) {}
}
