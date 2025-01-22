import { DayId, IDayValue, IMoodValue, MoodId } from '@/app/types/moodtracker';

interface IMoodTrackerCheckboxesProps {
  mood: IMoodValue;
  day: IDayValue;
  handleValueChange: (
    moodId: MoodId,
    dayId: DayId,
    level: number | null,
    date: string
  ) => void;
  disabled: boolean;
}

const MoodTrackerCheckboxes = ({
  mood,
  day,
  handleValueChange,
  disabled,
}: IMoodTrackerCheckboxesProps) => {
  return (
    <div className="flex flex-col gap-1.5 pt-8 sm:gap-3 items-center relative">
      {Array.from({ length: mood.yAxis.length }, (_, index) => {
        const level = mood.yAxis.length - 1 - index;
        const isChecked = day.value === level;

        return (
          <div 
            className="relative h-5 md:h-7" 
            key={`${mood.id}-${day.id}-${index}`}
          >
            <input
              className={`peer w-5 h-5 md:w-7 md:h-7 appearance-none rounded-full cursor-pointer 
                transition-all duration-200 ease-in-out
                border-2 bg-white
                ${
                  disabled
                    ? 'cursor-not-allowed bg-gray-100 border-gray-300'
                    : 'border-primary-medium hover:border-primary-dark'
                }
                ${!disabled && '[&:not(:checked)]:hover:bg-primary-light'}
                focus:outline-none focus:ring-2 
                focus:ring-primary-dark focus:ring-offset-1
                checked:scale-90
                checked:bg-primary-medium checked:border-primary-dark`}
              type="checkbox"
              id={`${mood.id}-${day.id}-${index}`}
              checked={isChecked}
              onChange={(e) => {
                handleValueChange(
                  mood.id,
                  day.id,
                  e.target.checked ? level : null,
                  day.date
                );
              }}
              aria-label={`Nivå ${level} av ${mood.yAxis.length - 1} för ${
                mood.moodName
              } på ${day.name}`}
              disabled={disabled}
            />
            {isChecked && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
              </div>
            )}
          </div>
        );
      })}
      <div className="absolute h-full w-0.5 bg-gray-200 -z-10" />
    </div>
  );
};

export default MoodTrackerCheckboxes;
