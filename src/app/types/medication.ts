export interface IMedication {
  name: string;
  dosage: string;
  frequency: string;
  notes: string;
  reminder: IReminder;
}

export interface IReminder {
  enabled: boolean;
  method: string;
  time: string;
}
