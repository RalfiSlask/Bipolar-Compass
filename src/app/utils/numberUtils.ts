/**
 * Sorts an array of generic type T by either asc or desc depending on a boolean argument.
 * Uses a callback function that extracts a number from an item.
 * @param {T[]} items
 * @param {(item: T) => number | undefined} valueExtractor
 * @param {boolean} ascending
 * @returns {T[]}
 */
export const sortByNumberField = <T>(
  items: T[],
  valueExtractor: (item: T) => number | undefined,
  ascending: boolean = false
): T[] => {
  return [...items].sort((a, b) => {
    const valueA = valueExtractor(a) ?? 0;
    const valueB = valueExtractor(b) ?? 0;

    return ascending ? valueA - valueB : valueB - valueA;
  });
};

export const roundToNearestHalf = (value: number) => {
  return Math.round(value * 2) / 2;
};
