import { format, isAfter, subDays, subMonths, subYears } from 'date-fns';
import { sv } from 'date-fns/locale';
import { IHistoryChartDataPoint } from '../types/history';
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

/**
 * Calculates the average value from an array of chart data points
 *
 * @param {IHistoryChartDataPoint[]} data - The array of chart data points
 * @returns {number | null} - The average value or null if the array is empty
 */
export const getLatestAverage = (
  data: IHistoryChartDataPoint[]
): number | null => {
  if (data.length === 0) return null;
  return data.reduce((sum, item) => sum + item.value, 0) / data.length;
};

/**
 * This function is used to get the tip for a mood based on the average value of the mood.
 *
 * If the data length is less than 3, it returns a message to the user to continue registering their mood.
 * If the average value is greater than 4, it returns a tip to the user to improve their mood.
 * @param moodId - The id of the mood to get the tip for.
 * @param average - The average value of the mood.
 * @param dataLength - The length of the data.
 * @returns {string | null} - The tip for the mood or null if there is no tip.
 */
export const getHistoryChartTip = (
  moodId: string,
  average: number | null,
  dataLength: number
): string | null => {
  if (average === null) return null;

  if (dataLength < 3) {
    return 'Fortsätt registrera ditt mående för att få anpassade tips och insikter.';
  }

  switch (moodId) {
    case 'anxiety':
      return average > 4
        ? 'Tips: Prata med någon du litar på. Meditera eller gör något du tycker är lugnande för kroppen. Överväg att kontakta en terapeut.'
        : null;
    case 'stress':
      return average > 4
        ? 'Tips: Prova meditation eller djupandning. Ta regelbundna pauser i arbetet.'
        : null;
    case 'depression':
      return average > 4
        ? 'Tips: Prata med någon du litar på. Överväg att kontakta en terapeut.'
        : null;
    case 'energy':
      return average < 3
        ? 'Tips: Försök att få regelbunden sömn och rörelse. Ta korta promenader under dagen.'
        : null;
    case 'physical':
      return average < 1
        ? 'Tips: Börja med korta promenader. Sätt upp små, uppnåbara träningsmål.'
        : null;
    case 'social':
      return average < 2
        ? 'Tips: Försök att ta små sociala initiativ. Ring en vän eller familjemedlem.'
        : null;
    case 'sleep':
      return average < 6
        ? 'Tips: Försök att hålla regelbundna sovtider. Undvik skärmar innan läggdags.'
        : null;
    default:
      return null;
  }
};

/**
 * This function is used to transform the mood data into a format that can be used to display in the chart.
 *
 * It returns an array of objects with the date, value, id, and name of the mood.
 * @param moodIndex - The index of the mood to transform.
 * @returns {IHistoryChartDataPoint[]} - The transformed mood data.
 */
export const transformMoodData = (
  moodIndex: number,
  moodTrackerData: IMoodTrackerWeek[]
): IHistoryChartDataPoint[] => {
  return moodTrackerData
    .flatMap((week) =>
      week.mood_values[moodIndex]?.valueForDays
        .filter(
          (day) => day.date && day.value !== null && day.value !== undefined
        )
        .map((day) => {
          try {
            const dateObj = new Date(day.date);
            if (isNaN(dateObj.getTime())) {
              console.warn(`Invalid date found: ${day.date}`);
              return null;
            }

            return {
              date: format(dateObj, 'd/M', { locale: sv }),
              value: day.value,
              id: day.id,
              name: week.mood_values[moodIndex].moodName,
            };
          } catch (error) {
            console.warn(`Error processing date ${day.date}:`, error);
            return null;
          }
        })
    )
    .filter((item): item is IHistoryChartDataPoint => item !== null);
};

export const getHistoryChartData = (
  moodIndex: number,
  moodTrackerData: IMoodTrackerWeek[],
  activeTab: string
): IHistoryChartDataPoint[] => {
  const today = new Date();
  let filterDate = today;

  switch (activeTab) {
    case 'vecka':
      filterDate = subDays(today, 7);
      break;
    case 'månad':
      filterDate = subMonths(today, 1);
      break;
    case '1 år':
      filterDate = subYears(today, 1);
      break;
    case 'alla data':
      return transformMoodData(moodIndex, moodTrackerData);
  }

  const allData = transformMoodData(moodIndex, moodTrackerData);

  return (
    allData
      .filter((item) => {
        // first we filter out the data based on the date
        const [day, month] = item.date.split('/').map(Number);
        const currentYear = new Date().getFullYear();
        const itemDate = new Date(currentYear, month - 1, day);
        // if the item date is after today, we set the item date to the previous year
        const adjustedDate = isAfter(itemDate, today)
          ? new Date(currentYear - 1, month - 1, day)
          : itemDate;
        // if the adjusted date is after the filter date and before today, we return the item
        return adjustedDate >= filterDate && adjustedDate <= today;
      })
      // then we sort the data based on the date
      .sort((a, b) => {
        const [dayA, monthA] = a.date.split('/').map(Number);
        const [dayB, monthB] = b.date.split('/').map(Number);
        const dateA = new Date(new Date().getFullYear(), monthA - 1, dayA);
        const dateB = new Date(new Date().getFullYear(), monthB - 1, dayB);
        return dateA.getTime() - dateB.getTime();
      })
  );
};

export const formatHistoryChartTooltipValue = (
  value: number,
  moodName: string,
  yAxis?: string[]
) => {
  if (
    yAxis &&
    typeof value === 'number' &&
    value >= 0 &&
    value < yAxis.length
  ) {
    return [yAxis[value] || value.toString(), moodName];
  }
  return [value, moodName];
};
