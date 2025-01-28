import { IMoodTrackerWeek } from '../types/moodtracker';

/**
 * Returns a tick interval for a mood tracker chart based on the data length and active tab
 * the tick interval is the number of days between each tick on the x-axis
 * @param {number} dataLength
 * @param {string} activeTab
 * @returns {number}
 */
export const getTickInterval = (
  dataLength: number,
  activeTab: string
): number => {
  if (activeTab === 'vecka') return 0;

  if (dataLength <= 31) return 3;
  if (dataLength <= 90) return 7;
  return 14;
};

/**
 * Formats a y-axis tick value for a mood tracker chart
 * the tick interval is the number of days between each tick on the y-axis
 * @param {number} value
 * @param {string[]} yAxis
 * @returns {string}
 */
export const formatYAxisTick = (value: number, yAxis?: string[]): string => {
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

/**
 * Returns a y-axis domain for a mood tracker chart
 * the y-axis domain is the range of the y-axis
 * @param {number} moodIndex
 * @param {IMoodTrackerWeek[]} moodTrackerData
 * @returns {[number, number]}
 */
export const getYAxisDomain = (
  moodIndex: number,
  moodTrackerData: IMoodTrackerWeek[]
): [number, number] => {
  const mood = moodTrackerData[0]?.mood_values[moodIndex];
  if (!mood?.yAxis) return [0, 10];
  return [-1, mood.yAxis.length];
};

/**
 * Returns a y-axis ticks for a mood tracker chart
 * the y-axis ticks are the values on the y-axis
 * @param {number} moodIndex
 * @param {IMoodTrackerWeek[]} moodTrackerData
 * @returns {number[] | undefined}
 */
export const getYAxisTicks = (
  moodIndex: number,
  moodTrackerData: IMoodTrackerWeek[]
): number[] | undefined => {
  const mood = moodTrackerData[0]?.mood_values[moodIndex];
  if (!mood?.yAxis) return undefined;
  return Array.from({ length: mood.yAxis.length }, (_, i) => i);
};

/**
 * Formats an x-axis tick item for a mood tracker chart
 * the x-axis tick item is the date of the tick on the x-axis
 * @param {string} tickItem
 * @param {string} activeTab
 * @returns {string}
 */
export const formatXAxis = (tickItem: string, activeTab: string): string => {
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
