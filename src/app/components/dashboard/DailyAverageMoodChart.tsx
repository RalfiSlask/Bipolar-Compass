import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';
import { IMoodValue } from '@/app/types/moodtracker';
import { SWEDISH_DAYS_OF_THE_WEEK } from '@/app/data/daysOfTheWeek';
import { ENGLISH_DAYS_OF_THE_WEEK } from '@/app/data/daysOfTheWeek';

interface IDailyAverageMoodChartProps {
  moodValues: IMoodValue[] | undefined;
}

const DailyAverageMoodChart = ({ moodValues }: IDailyAverageMoodChartProps) => {
  const calculateDailyAverageMood = () => {
    const averages = SWEDISH_DAYS_OF_THE_WEEK.map((day, index) => {
      const dayMoods = moodValues
        ?.map((mood) => {
          const dayData = mood.valueForDays.find(
            (d) => d.id === ENGLISH_DAYS_OF_THE_WEEK[index]
          );
          if (dayData?.value === null) return null;
          return {
            value: dayData?.value || 0,
            maxScale: mood.yAxis.length - 1,
          };
        })
        .filter((m) => m !== null);

      const avgMood = dayMoods?.reduce((acc, curr) => {
        if (!curr) return acc;
        return acc + curr.value / curr.maxScale;
      }, 0);

      return {
        day: day,
        average: dayMoods?.length
          ? ((avgMood || 0) / dayMoods.length) * 100
          : 0,
      };
    });

    return averages;
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={calculateDailyAverageMood()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis domain={[0, 100]} />
        <Tooltip
          formatter={(value: number) => [`${Math.round(value)}%`, 'Mående']}
          contentStyle={{
            backgroundColor: '#fff',
            borderRadius: '8px',
          }}
        />
        <Bar dataKey="average" fill="#46737c" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailyAverageMoodChart;
