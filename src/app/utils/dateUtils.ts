/**
 * Formats a string of minutes and hours based on number of seconds
 * @param {number | null} seconds
 * @returns {string}
 */
export const getFormattedTimeFromSeconds = (seconds: number | null): string => {
  if (!seconds) return '';
  const runtimeInSeconds = seconds || 0;

  const hours = Math.floor(runtimeInSeconds / 3600);
  const minutes = Math.floor((runtimeInSeconds % 3600) / 60);

  return `${hours > 0 ? `${hours}h ` : ''}${
    minutes > 0 ? `${minutes}m` : ''
  }`.trim();
};

/**
 * Formats a number of seconds to minutes and seconds in a string format
 * @param {number} seconds
 * @returns {string}
 */
export const formatDurationToMinutesAndSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Formats a date string to a month, day and year string
 * @param {string} date
 * @returns {string}
 */
export const getCreateDateAsMonthDayAndYear = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('sv-SE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Returns week number based on a date argument
 * @param {Date} date
 * @returns {number}
 */
export const getWeekNumber = (date: Date): number => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

/**
 * Returns an array of swedish week dates
 * @param {Date} date
 * @returns {string[]}
 */
export const getWeekDates = (date: Date): string[] => {
  const monday = new Date(date);
  monday.setDate(date.getDate() - (date.getDay() || 7) + 1);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);
    weekDates.push(
      currentDate.toLocaleDateString('sv-SE', {
        day: 'numeric',
        month: 'numeric',
      })
    );
  }

  return weekDates;
};
