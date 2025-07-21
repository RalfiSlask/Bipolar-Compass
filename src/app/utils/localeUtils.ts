/**
 *
 * Returns the language name in long format based on language code i.e ("English", "Svenska")
 *
 * @param {string} code - lang code
 * @param {locale} locale - what language we want to return in
 * @returns {string} - language in long format
 */
export const getLanguageName = (code: string, locale = 'sv'): string => {
  const longFormat = new Intl.DisplayNames([locale], { type: 'language' }).of(
    code
  );
  if (longFormat) {
    return (
      longFormat?.substring(0, 1).toUpperCase() +
      longFormat?.substring(1, longFormat.length)
    );
  } else {
    return '';
  }
};
