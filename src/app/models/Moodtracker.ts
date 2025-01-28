import { moodTrackerValuesData } from '../data/moodtracker';
import {
  DayId,
  IDayValue,
  IMoodTrackerWeek,
  IMoodValue,
  MoodId,
} from '../types/moodtracker';
import { getWeekNumber } from '../utils/dateUtils';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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

  static createDefaultWeek(startDate: Date): DayValue[] {
    const monday = new Date(startDate);

    return [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ].map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      return new DayValue({
        id: day as DayId,
        name: this.getDayName(day),
        value: null,
        date: this.formatDate(date),
      });
    });
  }

  private static getDayName(day: string): string {
    const dayNames: { [key: string]: string } = {
      monday: 'Måndag',
      tuesday: 'Tisdag',
      wednesday: 'Onsdag',
      thursday: 'Torsdag',
      friday: 'Fredag',
      saturday: 'Lördag',
      sunday: 'Söndag',
    };
    return dayNames[day];
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
      this.valueForDays = DayValue.createDefaultWeek(new Date());
    } else {
      this.valueForDays = moodValue.valueForDays.map(
        (day) => new DayValue(day as IDayValue)
      );
    }
    this.yAxis = moodValue.yAxis;
  }

  toPlainObject(): IMoodValue {
    return {
      id: this.id,
      moodName: this.moodName,
      valueForDays: this.valueForDays,
      yAxis: this.yAxis,
    };
  }

  static createDefaultMoodValues(): MoodValue[] {
    const defaultDays = DayValue.createDefaultWeek(new Date());
    return moodTrackerValuesData.moodValues.map(
      (mood) =>
        new MoodValue({
          ...(mood as IMoodValue),
          valueForDays: defaultDays,
        })
    );
  }
}

export class MoodtrackerWeek extends Document {
  id: string;
  user_id: string;
  week_number: number;
  year: number;
  created_at: string;
  updated_at: string;
  mood_values: MoodValue[];

  constructor(moodtrackerWeek: IMoodTrackerWeek) {
    super();
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

  toPlainObject(): IMoodTrackerWeek {
    return {
      id: this.id,
      user_id: this.user_id,
      week_number: this.week_number,
      year: this.year,
      created_at: this.created_at,
      updated_at: this.updated_at,
      mood_values: this.mood_values.map((mood) => mood.toPlainObject()),
    };
  }

  static createDefault(
    userId: string,
    selectedDate: Date = new Date()
  ): MoodtrackerWeek {
    const weekNumber = getWeekNumber(selectedDate);
    const year = selectedDate.getFullYear();

    const monday = new Date(selectedDate);
    monday.setDate(selectedDate.getDate() - ((selectedDate.getDay() + 6) % 7));

    const defaultDays = DayValue.createDefaultWeek(monday);

    return new MoodtrackerWeek({
      id: generateUUID(),
      user_id: userId,
      week_number: weekNumber,
      year: year,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      mood_values: moodTrackerValuesData.moodValues.map(
        (mood) =>
          new MoodValue({
            ...(mood as IMoodValue),
            valueForDays: defaultDays,
          })
      ),
    });
  }
}
