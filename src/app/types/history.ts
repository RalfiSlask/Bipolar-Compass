import { DayId } from './moodtracker';

export interface IHistoryChartDataPoint {
  date: string;
  value: number;
  id: DayId;
  name: string;
}
