import { DayId, IDayValue, IMoodValue, MoodId } from '@/app/types/moodtracker';

interface IMoodTrackerCheckboxesProps {
  mood: IMoodValue;
  day: IDayValue;
  handleValueChange: (
    moodId: MoodId,
    dayId: DayId,
    value: number | null
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
    <div className="flex flex-col gap-4 items-center">
      {Array.from({ length: mood.yAxis.length }, (_, index) => {
        const level = mood.yAxis.length - 1 - index;

        return (
          <div className="relative h-6" key={`${mood.id}-${day.id}-${index}`}>
            <input
              className={`peer w-6 h-6 appearance-none rounded-full cursor-pointer 
                    border-2 bg-white
                    ${
                      disabled
                        ? 'cursor-not-allowed bg-gray-200 border-gray-400'
                        : 'border-primary-medium'
                    }
                    ${!disabled && '[&:not(:checked)]:hover:bg-primary-light'}
                    focus:outline-none focus:ring-2 
                    focus:ring-primary-dark focus:ring-offset-1
                    checked:bg-primary-medium checked:border-primary-dark`}
              type="checkbox"
              id={`${mood.id}-${day.id}-${index}`}
              checked={day.value === level}
              onChange={(e) => {
                handleValueChange(
                  mood.id,
                  day.id,
                  e.target.checked ? level : null
                );
              }}
              aria-label={`Nivå ${level} av ${mood.yAxis.length - 1} för ${
                mood.moodName
              } på ${day.name}`}
              disabled={disabled}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MoodTrackerCheckboxes;
