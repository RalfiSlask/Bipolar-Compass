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

export const removeEntryElements = (date: string) => {
  const existingContent = document.getElementById(`${date}-content`);
  const existingButton = document.getElementById(`${date}-button`);
  const existingDeleteButton = document.getElementById(`${date}-delete-button`);
  const existingDescription = document.getElementById(`${date}-description`);

  const dayTop = document.getElementById(`${date}-top`);
  if (dayTop) dayTop.classList.remove('have-entry');
  if (existingContent) existingContent.remove();
  if (existingDescription) existingDescription.remove();
  if (existingButton) existingButton.remove();
  if (existingDeleteButton) existingDeleteButton.remove();
};
