import { IMoodTrackerWeek } from '../types/moodtracker';

/**
 * Checks if the mood data has sufficient data
 * @param {IMoodTrackerWeek[]} moodData
 * @returns {boolean}
 */
export const hasSufficientData = (moodData: IMoodTrackerWeek[]): boolean => {
  // Flattens the mood data to an array of mood values
  const moodValues = moodData.flatMap((week) =>
    week.mood_values.flatMap((mood) => mood.valueForDays)
  );

  if (!moodValues) return false;

  // Filters out null values and checks if there are at least 10 valid days
  const validDays = moodValues.filter((day) => day.value !== null);
  return validDays.length >= 10;
};

/**
 * Evaluates the mood score and returns a mood state
 * These states are used to inform the user about their mood state
 * @param {number} moodScore
 * @param {IMoodTrackerWeek[]} moodData
 * @returns {string | null}
 */
export const evaluateMood = (
  moodScore: number,
  moodData: IMoodTrackerWeek[]
): string | null => {
  if (!hasSufficientData(moodData)) return null;

  if (moodScore >= 80) {
    return 'manic';
  } else if (moodScore >= 70) {
    return 'hypomanic';
  } else if (moodScore <= 20) {
    return 'depressed';
  } else if (moodScore >= 40 && moodScore <= 60) {
    return 'normal';
  } else {
    return null;
  }
};

/**
 * Returns a message based on the mood score and mood data
 * These messages are used to inform the user about their mood state
 * @param {number} moodScore
 * @param {IMoodTrackerWeek[]} moodData
 * @returns {string | null}
 */
export const renderMessage = (
  moodScore: number,
  moodData: IMoodTrackerWeek[]
): string | null => {
  const moodState = evaluateMood(moodScore, moodData);

  switch (moodState) {
    case 'manic':
      return 'Du har högst sannolikt maniskt tillstånd. Försök att omedelbart kontakta din läkare.';
    case 'hypomanic':
      return 'Var vaksam på ditt tillstånd. Du är förmodligen i ett hypomaniskt tillstånd. Du kan behöva hjälp av din läkare. Kom ihåg att ta din medicin och hålla dig i balans.';
    case 'depressed':
      return 'Du befinner dig högst sannolikt i ett depressivt tillstånd. Så hjälp dig själv genom att kontakta din läkare och närstående. Var noga med att följa din medicinering och hålla dig i balans.';
    case 'normal':
      return 'Du befinner dig i ett normalt tillstånd. Fortsätt med att hålla dig i balans och följa din medicinering.';
    default:
      return null;
  }
};

/**
 * Converts a medicine frequency to a Swedish string
 * @param {string} frequency
 * @returns {string}
 */
export const convertMedicineFrequencyToSwedishString = (
  frequency: string
): string => {
  if (frequency === '1_daily') return '1 gång om dagen';
  if (frequency === '2_daily') return '2 gånger om dagen';
  if (frequency === '3_daily') return '3 gånger om dagen';
  if (frequency === '4_daily') return '4 gånger om dagen';
  if (frequency === 'as_needed') return 'Vid behov';
  return '';
};

/**
 * Returns a color based on the mood score
 * The colors are such that the it reflects the nature of bipolar disorder
 * @param {number} score
 * @returns {string}
 */
export const moodScoreColor = (score: number): string => {
  if (score >= 80) return '#0088FE';
  if (score >= 60) return '#00C49F';
  if (score >= 40) return '#FFBB28';
  if (score >= 20) return '#FF8042';
  return '#FF6384';
};
