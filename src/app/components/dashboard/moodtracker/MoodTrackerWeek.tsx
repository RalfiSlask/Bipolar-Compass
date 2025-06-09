import ScrollToTop from '@/app/components/shared/ScrollToTop';
import { DayId, IMoodValue, MoodId } from '@/app/types/moodtracker';
import { getMoodIcon } from '@/app/utils/moodtrackerUtils';
import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import MoodTrackerCheckboxes from './MoodTrackerCheckboxes';
import MoodTrackerIntroContainer from './MoodTrackerIntroContainer';
import MoodYaxisValues from './MoodYaxisValues';

interface IMoodTrackerWeekProps {
  moodTrackerValues: IMoodValue[];
  handleValueChange: (
    moodId: MoodId,
    dayId: DayId,
    level: number | null,
    date: string
  ) => void;
  user: string;
  saveMoodTrackerData: () => void;
}

const MoodTrackerWeek = ({
  moodTrackerValues,
  handleValueChange,
  saveMoodTrackerData,
  user,
}: IMoodTrackerWeekProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-6xl w-full">
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <MoodTrackerIntroContainer user={user} week={true} />
          <button
            className="px-6 py-3 bg-primary-dark hover:bg-primary-medium 
            transition-colors rounded-lg text-white font-medium
            flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            onClick={saveMoodTrackerData}
          >
            <FaSave className="w-5 h-5" />
            Spara veckan
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {moodTrackerValues.map((mood) => (
            <div
              key={mood.id}
              className="bg-primary-light rounded-xl p-4 sm:p-6 
              shadow-md hover:shadow-lg transition-shadow"
            >
              <h2
                className="text-xl font-semibold mb-6 text-primary-dark 
                flex items-center gap-2 border-b border-primary-border pb-3"
              >
                {getMoodIcon(mood.moodName)}
                {mood.moodName}
              </h2>

              <div className="hidden sm:grid sm:grid-cols-[80px_repeat(7,1fr)] md:grid-cols-[150px_repeat(7,1fr)]  gap-3">
                <MoodYaxisValues moodValue={mood} />
                {mood.valueForDays.map((day) => {
                  const isFutureDate = new Date(day.date) > new Date();
                  return (
                    <div key={day.id} className="flex flex-col">
                      <div
                        className={`text-sm font-medium text-center mb-2 sm:mb-4 
                          ${
                            isFutureDate ? 'text-gray-400' : 'text-primary-dark'
                          }`}
                      >
                        <div className="text-sm md:text-base font-semibold">
                          {day.name}
                        </div>
                        <div className="text-xs sm:text-sm">
                          {new Date(day.date).toLocaleDateString('sv-SE', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                      <MoodTrackerCheckboxes
                        mood={mood}
                        day={day}
                        handleValueChange={handleValueChange}
                        disabled={isFutureDate}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="sm:hidden flex flex-col gap-4">
                {mood.valueForDays
                  .filter((day) => new Date(day.date) <= new Date())
                  .map((day) => (
                    <div
                      key={day.id}
                      className="bg-white rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-primary-dark">
                          <div className="font-semibold">{day.name}</div>
                          <div className="text-sm">
                            {new Date(day.date).toLocaleDateString('sv-SE', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-full max-w-20">
                          <MoodYaxisValues moodValue={mood} />
                        </div>
                        <div className="flex-1">
                          <MoodTrackerCheckboxes
                            mood={mood}
                            day={day}
                            handleValueChange={handleValueChange}
                            disabled={false}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showScrollTop && <ScrollToTop scrollToTop={scrollToTop} />}
    </div>
  );
};

export default MoodTrackerWeek;
