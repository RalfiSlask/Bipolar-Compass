import { MoodValue } from '@/app/models/Moodtracker';

interface MoodYaxisValuesProps {
  moodValue: MoodValue;
}

const MoodYaxisValues = ({ moodValue }: MoodYaxisValuesProps) => {
  return (
    <div className="flex flex-col-reverse justify-between h-full pt-8">
      {moodValue.yAxis.map((label, index) => (
        <div
          key={index}
          className="h-6 flex items-center text-sm text-primary-medium"
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default MoodYaxisValues;
