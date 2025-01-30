export interface IMedication {
  category: string;
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
  schedule: ISchedule[];
  history: IHistory[];
}

export interface ISchedule {
  time: string;
  nextReminder: string;
  messageId: string;
  status: 'pending' | 'sent' | 'cancelled';
}

export interface IHistory {
  time: string;
  sentAt: string;
  messageId: string;
  status: 'pending' | 'sent' | 'cancelled';
}
