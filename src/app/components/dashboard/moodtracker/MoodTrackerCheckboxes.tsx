import { DayId, IDayValue, IMoodValue, MoodId } from '@/app/types/moodtracker';

interface IMoodTrackerCheckboxesProps {
  mood: IMoodValue;
  day: IDayValue;
  handleValueChange: (moodId: MoodId, dayId: DayId, value: number) => void;
}

const MoodTrackerCheckboxes = ({
  mood,
  day,
  handleValueChange,
}: IMoodTrackerCheckboxesProps) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      {Array.from({ length: mood.yAxis.length }, (_, index) => (
        <div className="relative h-6" key={`${mood.id}-${day.id}-${index}`}>
          <input
            className="peer w-6 h-6 appearance-none rounded-full cursor-pointer 
                  border-2 border-primary-medium bg-white
                  [&:not(:checked)]:hover:bg-primary-light 
                  focus:outline-none focus:ring-2 
                  focus:ring-primary-dark focus:ring-offset-1
                  checked:bg-primary-medium checked:border-primary-dark"
            type="checkbox"
            id={`${mood.id}-${day.id}-${index}`}
            checked={day.value === index + 1}
            onChange={(e) => {
              handleValueChange(
                mood.id,
                day.id,
                e.target.checked ? index + 1 : 0
              );
            }}
            aria-label={`Nivå ${index + 1} av ${mood.yAxis.length} för ${
              mood.moodName
            } på ${day.name}`}
          />
        </div>
      ))}
    </div>
  );
};

export default MoodTrackerCheckboxes;
