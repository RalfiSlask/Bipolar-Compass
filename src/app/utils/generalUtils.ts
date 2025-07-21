/**
 * Returns the label of a value in an array of objects
 * @param {string} value
 * @param {Array<{ value: string; label: string }>} types
 * @returns {string}
 */
export const getLabelByValue = (
  value: string,
  types: { value: string; label: string }[]
): string => {
  const type = types.find((type) => type.value === value);
  return type ? type.label : 'Unknown';
};

/**
 * Formats a phone number for a tel: link
 *
 * Removes spaces, dashes, and other formatting, but keeps the + for international numbers
 * @param {string} phoneNumber
 * @returns {string}
 */
export const formatPhoneForTel = (phoneNumber: string): string => {
  return phoneNumber.replace(/[\s-]/g, '');
};

/**
 * Removes duplicates from an array of objects based on the id property
 *
 * @param array - The array of objects to remove duplicates from
 * @returns The array with duplicates removed
 */
export const removeDuplicatesFromArray = <T extends { id: string }>(
  array: T[]
): T[] => {
  return array.filter(
    (item: T, index: number, arr: T[]) =>
      arr.findIndex((i) => i.id === item.id) === index
  );
};

export const getLowerCaseStringsFromArray = (stringArray: string[]) => {
  return stringArray ? stringArray.join(', ').toLowerCase().trim() : '';
};
