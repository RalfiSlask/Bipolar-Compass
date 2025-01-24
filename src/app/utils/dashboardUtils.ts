import { IMoodTrackerWeek } from '../types/moodtracker';

export const hasSufficientData = (moodData: IMoodTrackerWeek[]): boolean => {
  const moodValues = moodData.flatMap((week) =>
    week.mood_values.flatMap((mood) => mood.valueForDays)
  );

  if (!moodValues) return false;

  const validDays = moodValues.filter((day) => day.value !== null);
  return validDays.length >= 10;
};

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

export const renderMessage = (
  moodScore: number,
  moodData: IMoodTrackerWeek[]
): string | null => {
  const moodState = evaluateMood(moodScore, moodData);

  switch (moodState) {
    case 'manic':
      return 'Du har högt sannolikt maniskt tillstånd. Försök att omedelbart kontakta din läkare.';
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

export const convertMedicineFrequencyToSwedishString = (
  frequency: string
): string => {
  if (frequency === '1_daily') return '1 gång om dagen';
  if (frequency === '2_daily') return '2 gånger om dagen';
  if (frequency === '3_daily') return '3 gånger om dagen';
  if (frequency === '4_daily') return '4 gånger om dagen';
  if (frequency === 'weekly') return '1 gång i veckan';
  if (frequency === 'as_needed') return 'Vid behov';
  return '';
};

export const moodScoreColor = (score: number) => {
  if (score >= 80) return '#0088FE';
  if (score >= 60) return '#00C49F';
  if (score >= 40) return '#FFBB28';
  if (score >= 20) return '#FF8042';
  return '#FF6384';
};
