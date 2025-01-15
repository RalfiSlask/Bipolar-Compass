import crypto from 'crypto';
import { moodTrackerValuesData } from '../data/moodtracker';
import {
  DayId,
  IDayValue,
  IMoodTrackerWeek,
  IMoodValue,
  MoodId,
} from '../types/moodtracker';
import { getWeekNumber } from '../utils/dateUtils';

export class DayValue implements IDayValue {
  id: DayId;
  name: string;
  value: number | null;
  date: string;

  constructor(day: IDayValue) {
    this.id = day.id;
    this.name = day.name;
    this.value = day.value ?? null;
    this.date = day.date || '';
  }

  static createDefaultWeek(): DayValue[] {
    const currentDate = new Date();
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));

    const defaultDays: IDayValue[] = [
      {
        id: 'monday' as DayId,
        name: 'Måndag',
        value: null,
        date: this.formatDate(monday),
      },
      {
        id: 'tuesday' as DayId,
        name: 'Tisdag',
        value: null,
        date: this.formatDate(new Date(monday.setDate(monday.getDate() + 1))),
      },
      {
        id: 'wednesday' as DayId,
        name: 'Onsdag',
        value: null,
        date: this.formatDate(new Date(monday.setDate(monday.getDate() + 1))),
      },
      {
        id: 'thursday' as DayId,
        name: 'Torsdag',
        value: null,
        date: this.formatDate(new Date(monday.setDate(monday.getDate() + 1))),
      },
      {
        id: 'friday' as DayId,
        name: 'Fredag',
        value: null,
        date: this.formatDate(new Date(monday.setDate(monday.getDate() + 1))),
      },
      {
        id: 'saturday' as DayId,
        name: 'Lördag',
        value: null,
        date: this.formatDate(new Date(monday.setDate(monday.getDate() + 1))),
      },
      {
        id: 'sunday' as DayId,
        name: 'Söndag',
        value: null,
        date: this.formatDate(new Date(monday.setDate(monday.getDate() + 1))),
      },
    ];
    return defaultDays.map((day) => new DayValue(day));
  }

  private static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}

export class MoodValue implements IMoodValue {
  id: MoodId;
  moodName: string;
  valueForDays: DayValue[];
  yAxis: string[];

  constructor(moodValue: IMoodValue) {
    this.id = moodValue.id;
    this.moodName = moodValue.moodName;
    if (!moodValue.valueForDays[0]?.date) {
      this.valueForDays = DayValue.createDefaultWeek();
    } else {
      this.valueForDays = moodValue.valueForDays.map(
        (day) => new DayValue(day as IDayValue)
      );
    }
    this.yAxis = moodValue.yAxis;
  }

  static createDefaultMoodValues(): MoodValue[] {
    const defaultDays = DayValue.createDefaultWeek();
    return moodTrackerValuesData.moodValues.map(
      (mood) =>
        new MoodValue({
          ...(mood as IMoodValue),
          valueForDays: defaultDays,
        })
    );
  }
}

export class MoodtrackerWeek implements IMoodTrackerWeek {
  id: string;
  user_id: string;
  week_number: number;
  year: number;
  created_at: string;
  updated_at: string;
  mood_values: MoodValue[];

  constructor(moodtrackerWeek: IMoodTrackerWeek) {
    this.id = moodtrackerWeek.id;
    this.user_id = moodtrackerWeek.user_id;
    this.week_number = moodtrackerWeek.week_number;
    this.year = moodtrackerWeek.year;
    this.created_at = moodtrackerWeek.created_at;
    this.updated_at = moodtrackerWeek.updated_at;
    this.mood_values = moodtrackerWeek.mood_values.map(
      (mood) => new MoodValue(mood)
    );
  }

  static createDefault(userId: string): MoodtrackerWeek {
    const currentDate = new Date();
    const weekNumber = getWeekNumber(currentDate);
    const year = currentDate.getFullYear();

    return new MoodtrackerWeek({
      id: crypto.randomUUID(),
      user_id: userId,
      week_number: weekNumber,
      year: year,
      created_at: currentDate.toISOString(),
      updated_at: currentDate.toISOString(),
      mood_values: MoodValue.createDefaultMoodValues(),
    });
  }
}
