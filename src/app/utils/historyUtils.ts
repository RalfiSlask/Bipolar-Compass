import { IMoodTrackerWeek } from '../types/moodtracker';

export const getTickInterval = (dataLength: number, activeTab: string) => {
  if (activeTab === 'vecka') return 0;

  if (dataLength <= 31) return 3;
  if (dataLength <= 90) return 7;
  return 14;
};

export const formatYAxisTick = (value: number, yAxis?: string[]) => {
  if (
    typeof value === 'number' &&
    value >= 0 &&
    yAxis &&
    value < yAxis.length
  ) {
    return yAxis[value] || value.toString();
  }
  return '';
};

export const getYAxisDomain = (
  moodIndex: number,
  moodTrackerData: IMoodTrackerWeek[]
) => {
  const mood = moodTrackerData[0]?.mood_values[moodIndex];
  if (!mood?.yAxis) return [0, 10];
  return [-1, mood.yAxis.length];
};

export const getYAxisTicks = (
  moodIndex: number,
  moodTrackerData: IMoodTrackerWeek[]
) => {
  const mood = moodTrackerData[0]?.mood_values[moodIndex];
  if (!mood?.yAxis) return undefined;
  return Array.from({ length: mood.yAxis.length }, (_, i) => i);
};

export const formatXAxis = (tickItem: string, activeTab: string) => {
  if (!tickItem) return '';
  const [day, month] = tickItem.split('/').map(Number);

  switch (activeTab) {
    case 'vecka':
      return tickItem;
    case 'månad':
      return tickItem;
    case '1 år':
    case 'alla data':
      return `${day}/${month}`;
    default:
      return '';
  }
};
