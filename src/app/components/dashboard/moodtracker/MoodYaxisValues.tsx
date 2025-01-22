import { MoodValue } from '@/app/models/Moodtracker';

interface MoodYaxisValuesProps {
  moodValue: MoodValue;
}

const MoodYaxisValues = ({ moodValue }: MoodYaxisValuesProps) => {
  return (
    <div className="flex flex-col-reverse gap-1.5 sm:gap-3 h-full pt-8">
      {moodValue.yAxis.map((label, index) => (
        <div
          key={index}
          className="h-5 md:h-7 flex items-center text-xs md:text-sm text-primary-medium"
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default MoodYaxisValues;
