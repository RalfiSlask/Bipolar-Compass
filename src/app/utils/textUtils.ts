export const shortenUrl = (url: string) => {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '');
};

export const stripHtmlTags = (input: string): string => {
  return input.replace(/<[^>]*>/g, '');
};
