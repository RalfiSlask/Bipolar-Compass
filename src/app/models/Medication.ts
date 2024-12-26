export class Medication {
  constructor(
    public name: string = '',
    public dosage: string = '',
    public frequency: string = '',
    public notes: string = '',
    public reminder: Reminder = new Reminder()
  ) {}
}

export class Reminder {
  constructor(
    public enabled: boolean = false,
    public method: string = '',
    public time: string = ''
  ) {}
}
