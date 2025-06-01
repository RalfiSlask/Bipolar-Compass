/**
 * Returns mood emoji based on given key
 * @param {string} mood
 * @returns {string}
 */
export const getMoodEmoji = (mood?: string) => {
  const moodMap: { [key: string]: string } = {
    happy: '😊',
    neutral: '😐',
    sad: '😢',
    energetic: '⚡',
    tired: '😴',
  };
  return mood ? moodMap[mood] : '';
};
