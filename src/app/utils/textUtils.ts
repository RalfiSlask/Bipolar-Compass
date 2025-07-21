export const shortenUrl = (url: string) => {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '');
};

export const stripHtmlTags = (input: string): string => {
  return input.replace(/<[^>]*>/g, '');
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.substring(0, 1).toUpperCase() + text.substring(1);
};
