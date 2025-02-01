import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import {
  FaFrown,
  FaGrinBeam,
  FaLaughBeam,
  FaMeh,
  FaSadTear,
  FaSmile,
} from 'react-icons/fa';
import { ANXIETY_COLORS } from '@/app/data/dashboardColors';

interface INormalizedAnxiety {
  name: string;
  value: number;
}

interface IAnxietyPieChartProps {
  normalizedAnxietyData: INormalizedAnxiety[];
}

const ANXIETY_ICONS = [
  FaLaughBeam,
  FaGrinBeam,
  FaSmile,
  FaMeh,
  FaFrown,
  FaSadTear,
];

const AnxietyPieChart = ({ normalizedAnxietyData }: IAnxietyPieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={normalizedAnxietyData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            percent,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            const Icon = ANXIETY_ICONS[index % ANXIETY_ICONS.length];
            const isLeftSide = x < cx;

            return (
              <g>
                <Icon
                  x={isLeftSide ? x - 12 : x - 9}
                  y={y - 15}
                  style={{
                    color: ANXIETY_COLORS[index % ANXIETY_COLORS.length],
                    fontSize: '24px',
                  }}
                />
                <text
                  x={isLeftSide ? x - 20 : x + 25}
                  y={y - 3}
                  fill={ANXIETY_COLORS[index % ANXIETY_COLORS.length]}
                  textAnchor={isLeftSide ? 'end' : 'start'}
                  dominantBaseline="central"
                >
                  {`${(percent * 100).toFixed(1)}%`}
                </text>
              </g>
            );
          }}
        >
          {normalizedAnxietyData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={ANXIETY_COLORS[index % ANXIETY_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AnxietyPieChart;
