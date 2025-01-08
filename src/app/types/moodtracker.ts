import { WithId } from 'mongodb';

export type DayId =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
export type MoodId =
  | 'anxiety'
  | 'stress'
  | 'depression'
  | 'energy'
  | 'physical'
  | 'social'
  | 'sleep';

export interface IDayValue {
  id: DayId;
  name: string;
  value: number;
  date: string;
}

export interface IMoodValue {
  id: MoodId;
  moodName: string;
  valueForDays: IDayValue[];
  yAxis: string[];
}

export interface IMoodTrackerWeek {
  id: string;
  user_id: string;
  week_number: number;
  year: number;
  created_at: string;
  updated_at: string;
  mood_values: IMoodValue[];
}

export interface IMoodTrackerDocument extends WithId<Document> {
  user_id: string;
  week_number: number;
  year: number;
  created_at: string;
  updated_at: string;
  mood_values: IMoodValue[];
}
