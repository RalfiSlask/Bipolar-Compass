import { moodTrackerValuesData } from '@/app/data/moodtracker';
import { DayId, IMoodValue, MoodId } from '@/app/types/moodtracker';
import { getMoodIcon } from '@/app/utils/moodtrackerUtils';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import MoodTrackerDaySwitcher from './MoodTrackerDaySwitcher';
import VerticalSlider from './VerticalSlider';

interface IMoodTrackerDayProps {
  moodTrackerValues: IMoodValue[];
  handleValueChange: (
    moodId: MoodId,
    dayId: DayId,
    level: number | null,
    date: string
  ) => void;
  saveMoodTrackerData: () => void;
  user: string;
  selectedDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
}

interface MoodStates {
  [key: string]: number;
}

const MoodTrackerDay = ({
  moodTrackerValues,
  handleValueChange,
  saveMoodTrackerData,
  user,
  selectedDate,
  onPreviousDay,
  onNextDay,
}: IMoodTrackerDayProps) => {
  const initializeMoodStates = (values: IMoodValue[], date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');

    return values.reduce((acc, mood) => {
      const dayValue =
        mood.valueForDays.find((day) => day.date === formattedDate)?.value ?? 0;

      return { ...acc, [mood.id]: dayValue };
    }, {});
  };

  const [moodStates, setMoodStates] = useState<MoodStates>(() =>
    initializeMoodStates(moodTrackerValues, selectedDate)
  );

  useEffect(() => {
    const newMoodStates = initializeMoodStates(moodTrackerValues, selectedDate);
    setMoodStates(newMoodStates);
  }, [selectedDate, moodTrackerValues]);

  useEffect(() => {
    console.log('selectedDate', selectedDate);
  }, [selectedDate]);

  const handleMoodChange = (moodId: MoodId, value: number | null) => {
    console.log('what is the selected date: ', selectedDate);
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const dayId = format(selectedDate, 'EEEE').toLowerCase() as DayId;

    setMoodStates((prev) => ({ ...prev, [moodId]: value ?? 0 }));
    handleValueChange(moodId, dayId, value, formattedDate);
  };

  const getMoodData = (moodId: string) => {
    const moodData = moodTrackerValuesData.moodValues.find(
      (mood) => mood.id === moodId
    );
    return {
      moodData,
      currentValue: moodStates[moodId] ?? 0,
    };
  };

  return (
    <div className="mx-auto max-w-7xl w-full">
      <div className="mb-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8 relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 bg-primary-light text-primary-dark rounded-full text-sm font-medium mb-4">
                Dagens hälsokoll
              </span>
              <h2 className="text-3xl font-semibold text-secondary-dark mb-3">
                Välkommen tillbaka, {user}!
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                Ta en stund att reflektera över hur du mår idag. Din mentala
                hälsa är viktig, och genom att följa dina mönster kan du bättre
                förstå dig själv.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light rounded-full  transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-tertiary-light rounded-full  transform translate-x-8 translate-y-8"></div>
          </div>

          <div className="lg:col-span-1">
            <MoodTrackerDaySwitcher
              selectedDate={selectedDate}
              handlePreviousDay={onPreviousDay}
              handleNextDay={onNextDay}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col gap-4">
              <label
                htmlFor="sleep-hours"
                className="text-lg font-medium text-primary-dark"
              >
                Hur många timmar sov du?
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="sleep-hours"
                  type="range"
                  min="0"
                  max="24"
                  step="1"
                  value={moodStates.sleep}
                  onChange={(e) =>
                    handleMoodChange('sleep', parseFloat(e.target.value))
                  }
                  className="flex-1 horizontal-slider"
                  style={{
                    background: `linear-gradient(to right, #659598 0%, #659598 ${
                      (moodStates.sleep / 24) * 100
                    }%, #eff7f7 ${
                      (moodStates.sleep / 24) * 100
                    }%, #eff7f7 100%)`,
                  }}
                />
                <div className="flex items-center gap-2 min-w-[100px]">
                  <span className="text-2xl font-semibold text-primary-dark">
                    {moodStates.sleep}
                  </span>
                  <span className="text-sm text-gray-600">timmar</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 pb-10">
            <label className="text-lg font-medium text-primary-dark mb-4 block">
              {getMoodData('social').moodData?.moodName}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {getMoodData('social').moodData?.yAxis.map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleMoodChange('social', index)}
                  className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-105 
                    ${
                      moodStates.social === index
                        ? 'bg-primary-dark text-white shadow-lg scale-105'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <div className="flex flex-col items-center justify-center p-1 h-full gap-2">
                    <span className="text-3xl">
                      {['🏠', '💻', '👋', '🤝', '🎉'][index]}
                    </span>
                    <span className="text-xs font-medium text-center">
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <label className="text-lg font-medium text-primary-dark mb-4 block">
              {getMoodData('physical').moodData?.moodName}
            </label>
            <div className="flex flex-wrap justify-center gap-4 pb-4">
              {getMoodData('physical').moodData?.yAxis.map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleMoodChange('physical', index)}
                  className={`relative group p-6 rounded-full transition-all duration-300
                    ${
                      moodStates.physical === index
                        ? 'bg-primary-dark text-white shadow-lg scale-105'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:scale-105'
                    }`}
                >
                  <span className="text-3xl">
                    {['🛋️', '🚶', '🏃', '💪'][index]}
                  </span>
                  <span
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                    opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap
                    text-primary-dark font-medium"
                  >
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
          {[
            { id: 'anxiety', value: moodStates.anxiety },
            { id: 'stress', value: moodStates.stress },
            { id: 'depression', value: moodStates.depression },
            { id: 'energy', value: moodStates.energy, reverse: true },
          ].map(({ id, value, reverse }) => (
            <div
              key={id}
              className="flex flex-col gap-6 bg-white rounded-2xl shadow-md p-6"
            >
              <div className="flex items-center gap-2 border-b border-primary-dark/20 pb-4">
                <label className="text-lg font-medium text-primary-dark block">
                  {getMoodData(id).moodData?.moodName}
                </label>
                {getMoodIcon(getMoodData(id).moodData?.moodName ?? '')}
              </div>

              <div className="flex gap-4 items-center justify-center h-[250px]">
                <div className="flex flex-col justify-between h-full text-sm">
                  {getMoodData(id)
                    .moodData?.yAxis.slice()
                    .reverse()
                    .map((label) => (
                      <span
                        key={label}
                        className={`text-right w-24 transition-colors ${
                          getMoodData(id).moodData!.yAxis[value] === label
                            ? 'text-primary-dark font-semibold'
                            : 'text-gray-400'
                        }`}
                      >
                        {label}
                      </span>
                    ))}
                </div>
                <VerticalSlider
                  min={0}
                  max={(getMoodData(id).moodData?.yAxis.length ?? 1) - 1}
                  value={value}
                  onChange={(newValue) =>
                    handleMoodChange(id as MoodId, newValue)
                  }
                  reverse={reverse}
                  height={250}
                  date={format(selectedDate, 'yyyy-MM-dd')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          className="px-8 py-4 bg-primary-dark hover:bg-primary-medium 
            rounded-xl text-white font-medium
            flex items-center gap-3 shadow-lg hover:shadow-xl
            transition-all duration-300"
          onClick={saveMoodTrackerData}
        >
          <FaSave className="w-5 h-5" />
          Spara ditt mående
        </button>
      </div>
    </div>
  );
};

export default MoodTrackerDay;
