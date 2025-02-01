import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from 'recharts';

interface ISleepValues {
  date: string;
  value: number;
}

interface ISleepGraphProps {
  sleepData: ISleepValues[];
}

const SleepGraph = ({ sleepData }: ISleepGraphProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={sleepData}>
        <CartesianGrid
          stroke="#ccc"
          strokeDasharray="5 5"
          strokeOpacity={0.3}
        />
        <XAxis
          dataKey="date"
          angle={-45}
          textAnchor="end"
          height={60}
          interval={Math.ceil(sleepData.length / 4)}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          width={100}
          domain={[0, 24]}
          ticks={[0, 4, 8, 12, 16, 20, 24]}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#f5f5f5',
            borderColor: '#ccc',
            fontSize: '14px',
          }}
          formatter={(value: number) => [`${value} timmar`, 'Sömn']}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#46737c"
          strokeWidth={2}
          dot={{ fill: '#46737c', r: 4 }}
          activeDot={{ r: 6, fill: '#46737c' }}
          connectNulls={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SleepGraph;
