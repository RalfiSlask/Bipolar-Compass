import { ANXIETY_COLORS } from '@/app/data/dashboardColors';
import { useEffect, useState } from 'react';
import {
  FaFrown,
  FaGrinBeam,
  FaLaughBeam,
  FaMeh,
  FaSadTear,
  FaSmile,
} from 'react-icons/fa';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chartHeight = isMobile ? 280 : 350;
  const outerRadius = isMobile ? 70 : 100;
  const iconSize = isMobile ? '18px' : '24px';
  const radiusOffset = isMobile ? 20 : 25;

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <PieChart>
        <Pie
          data={normalizedAnxietyData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
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
            const radius =
              radiusOffset + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            const Icon = ANXIETY_ICONS[index % ANXIETY_ICONS.length];
            const isLeftSide = x < cx;
            const iconOffset = isMobile ? 8 : 12;
            const textOffset = isMobile ? 15 : 25;

            return (
              <g>
                <Icon
                  x={isLeftSide ? x - iconOffset : x - (iconOffset - 3)}
                  y={y - (isMobile ? 12 : 15)}
                  style={{
                    color: ANXIETY_COLORS[index % ANXIETY_COLORS.length],
                    fontSize: iconSize,
                  }}
                />
                <text
                  x={isLeftSide ? x - textOffset : x + textOffset}
                  y={y - 3}
                  fill={ANXIETY_COLORS[index % ANXIETY_COLORS.length]}
                  textAnchor={isLeftSide ? 'end' : 'start'}
                  dominantBaseline="central"
                  fontSize={isMobile ? '12px' : '14px'}
                >
                  {`${(percent * 100).toFixed(1)}%`}
                </text>
              </g>
            );
          }}
        >
          {normalizedAnxietyData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={ANXIETY_COLORS[index % ANXIETY_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          wrapperStyle={{
            fontSize: isMobile ? '12px' : '16px',
            paddingTop: isMobile ? '10px' : '0px',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AnxietyPieChart;
