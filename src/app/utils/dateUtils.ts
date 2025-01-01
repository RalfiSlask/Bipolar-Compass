export const getFormattedTimeFromSeconds = (seconds: number | null) => {
  if (!seconds) return '';
  const runtimeInSeconds = seconds || 0;

  const hours = Math.floor(runtimeInSeconds / 3600);
  const minutes = Math.floor((runtimeInSeconds % 3600) / 60);

  return `${hours > 0 ? `${hours}h ` : ''}${
    minutes > 0 ? `${minutes}m` : ''
  }`.trim();
};
