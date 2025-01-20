import { DayId, IMoodValue, MoodId } from '@/app/types/moodtracker';
import { getMoodIcon } from '@/app/utils/moodtrackerUtils';
import { FaSave } from 'react-icons/fa';
import MoodTrackerCheckboxes from './MoodTrackerCheckboxes';
import MoodYaxisValues from './MoodYaxisValues';

interface IMoodTrackerWeekProps {
  moodTrackerValues: IMoodValue[];
  handleValueChange: (
    moodId: MoodId,
    dayId: DayId,
    level: number | null,
    date: string
  ) => void;

  saveMoodTrackerData: () => void;
}

const MoodTrackerWeek = ({
  moodTrackerValues,
  handleValueChange,
  saveMoodTrackerData,
}: IMoodTrackerWeekProps) => {
  return (
    <div className="mx-auto max-w-6xl w-full bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">
          Veckans Moodtracker
        </h1>
        <p className="text-gray-600">
          Spåra ditt mående genom att markera hur du känner dig varje dag. Ju
          högre nivå, desto starkare känsla.
        </p>
      </div>

      <div className="space-y-12">
        {moodTrackerValues.map((mood) => (
          <div key={mood.id} className="bg-primary-light rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary-dark flex items-center gap-2">
              {getMoodIcon(mood.moodName)}
              {mood.moodName}
            </h2>
            <div className="grid grid-cols-[150px_repeat(7,1fr)] gap-3">
              <MoodYaxisValues moodValue={mood} />
              {mood.valueForDays.map((day) => {
                const isFutureDate = new Date(day.date) > new Date();
                return (
                  <div key={day.id} className="flex flex-col">
                    <div
                      className={`text-sm font-medium text-center mb-4 
                        ${
                          isFutureDate ? 'text-gray-400' : 'text-primary-dark'
                        }`}
                    >
                      <div className="text-base">{day.name}</div>
                      <div>
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
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          className="px-6 py-3 hover:bg-primary-medium bg-primary-dark 
              transition-colors rounded-lg text-white font-medium
              flex items-center gap-2"
          onClick={saveMoodTrackerData}
        >
          <FaSave className="w-5 h-5" />
          Spara veckan
        </button>
      </div>
    </div>
  );
};

export default MoodTrackerWeek;
