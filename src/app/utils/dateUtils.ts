export const getFormattedTimeFromSeconds = (seconds: number | null) => {
  if (!seconds) return '';
  const runtimeInSeconds = seconds || 0;

  const hours = Math.floor(runtimeInSeconds / 3600);
  const minutes = Math.floor((runtimeInSeconds % 3600) / 60);

  return `${hours > 0 ? `${hours}h ` : ''}${
    minutes > 0 ? `${minutes}m` : ''
  }`.trim();
};

export const formatDurationToMinutesAndSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getCreateDateAsMonthDayAndYear = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('sv-SE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
