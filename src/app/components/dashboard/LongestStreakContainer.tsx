import { FaFire } from 'react-icons/fa';
import { IMoodValue } from '@/app/types/moodtracker';

interface ILongestStreakContainerProps {
  moodValues: IMoodValue[] | undefined;
}

const LongestStreakContainer = ({
  moodValues,
}: ILongestStreakContainerProps) => {
  const calculateLongestStreak = () => {
    let currentStreak = 0;
    let longestStreak = 0;

    const allDays = moodValues?.[0]?.valueForDays || [];

    allDays.forEach((day) => {
      const hasEntries = moodValues?.some((mood) => {
        const dayData = mood.valueForDays.find((d) => d.id === day.id);
        return dayData?.value !== null;
      });

      if (hasEntries) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });

    return longestStreak;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <FaFire className="text-orange-500 text-2xl mr-3" />
        <h3 className="text-xl font-semibold text-secondary-dark">
          Nuvarande Svit
        </h3>
      </div>
      <p className="text-4xl font-bold text-primary-dark">
        {calculateLongestStreak()}{' '}
        {calculateLongestStreak() === 1 ? 'dag' : 'dagar'}
      </p>
      <p className="text-gray-600 mt-2">Längsta period med registrerad data</p>
    </div>
  );
};

export default LongestStreakContainer;
