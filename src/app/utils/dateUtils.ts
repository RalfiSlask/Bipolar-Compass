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

export const getWeekNumber = (date: Date): number => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

export const getWeekDates = (date: Date): string[] => {
  const monday = new Date(date);
  monday.setDate(date.getDate() - (date.getDay() || 7) + 1); // Få måndagens datum

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
