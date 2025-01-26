import { MoodValue } from '@/app/models/Moodtracker';

interface MoodYaxisValuesProps {
  moodValue: MoodValue;
}

const MoodYaxisValues = ({ moodValue }: MoodYaxisValuesProps) => {
  console.log(moodValue);

  const yAxisWithNoData = moodValue.yAxis.map((label) => {
    if (label === 'Ingen data') {
      return null;
    } else {
      return label;
    }
  });

  console.log(yAxisWithNoData);

  return (
    <div className="flex flex-col-reverse gap-1.5 sm:gap-3 h-full pt-8">
      {moodValue.yAxis.map(
        (label, index) =>
          label !== 'Ingen data' && (
            <div
              key={index}
              className="h-5 md:h-7 flex items-center text-xs md:text-sm text-primary-medium"
            >
              {label}
            </div>
          )
      )}
    </div>
  );
};

export default MoodYaxisValues;
