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
