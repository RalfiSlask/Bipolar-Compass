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
