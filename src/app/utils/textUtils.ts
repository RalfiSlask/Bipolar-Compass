export const shortenUrl = (url: string) => {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '');
};
