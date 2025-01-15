export const getMoodEmoji = (mood?: string) => {
    const moodMap: { [key: string]: string } = {
      glad: '😊',
      neutral: '😐',
      ledsen: '😢',
      energisk: '⚡',
      trött: '😴',
    };
    return mood ? moodMap[mood] : '';
  };