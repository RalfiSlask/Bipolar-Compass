import { IMedication, IReminder } from '../types/medication';

export class Medication implements IMedication {
  constructor(
    public category: string = '',
    public name: string = '',
    public dosage: number = 0,
    public doseUnit: string = '',
    public frequency: string = '',
    public times: string[] = [],
    public notes: string = '',
    public reminder: Reminder = new Reminder()
  ) {}
}

export class Reminder implements IReminder {
  constructor(
    public enabled: boolean = false,
    public method: string = '',
    public times: string[] = [],
    public messageIds: string[] = []
  ) {}
}
