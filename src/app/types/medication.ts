export interface IMedication {
  name: string;
  dosage: number;
  doseUnit: string;
  frequency: string;
  times: string[];
  notes: string;
  reminder: IReminder;
}

export interface IReminder {
  enabled: boolean;
  method: string;
  times: string[];
}
