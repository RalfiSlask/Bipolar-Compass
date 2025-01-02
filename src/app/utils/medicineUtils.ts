export const getNumberOfTimes = (frequency: string): number => {
  switch (frequency) {
    case '1_daily':
      return 1;
    case '2_daily':
      return 2;
    case '3_daily':
      return 3;
    case '4_daily':
      return 4;
    case 'weekly':
      return 1;
    default:
      return 0;
  }
};
