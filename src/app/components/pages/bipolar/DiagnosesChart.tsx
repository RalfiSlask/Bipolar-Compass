'use client';

import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  GRAPH_DATA,
  GRAPH_EXACT_LEVELS,
  GRAPH_MOOD_LEVELS,
} from '@/app/data/bipolarStatistics';

const getMoodLevel = (
  value: number,
  moodLevels: { threshold: number; label: string }[]
): string => {
  const lastIndex = moodLevels.length - 1;
  if (value <= moodLevels[lastIndex].threshold) {
    return moodLevels[lastIndex].label;
  }

  let closestLevel = moodLevels[0];
  let minDistance = Math.abs(value - moodLevels[0].threshold);

  for (const level of moodLevels) {
    const distance = Math.abs(value - level.threshold);
    if (distance < minDistance) {
      minDistance = distance;
      closestLevel = level;
    }
  }

  return closestLevel.label;
};

const DiagnosesChart = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const formatYAxisTick = (value: number): string => {
    if (isMobile) return '';
    return GRAPH_EXACT_LEVELS[value as keyof typeof GRAPH_EXACT_LEVELS] || '';
  };

  const formatTooltip = (value: number, name: string): [string, string] => {
    const moodLevel = getMoodLevel(value, GRAPH_MOOD_LEVELS);
    const diagnosisName =
      {
        bipolar1: 'Bipolär I',
        bipolar2: 'Bipolär II',
        cyclothymia: 'Cyklotymi',
      }[name] || name;

    return [moodLevel, diagnosisName];
  };

  return (
    <div className="content-container">
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-primary-dark mb-3">
          Bipolära Diagnoser - Mönster och Svängningar
        </h3>
        <p className="text-dark text-sm md:text-base">
          Denna graf visar de typiska måendesvängningarna för olika bipolära
          diagnoser över tid.
        </p>
      </div>

      <div className="w-full h-80 md:h-96 relative">
        <p className="absolute text-xs md:text-sm font-semibold text-red-400 z-10 top-[10%] left-[50%] sm:left-[15%]">
          Bipolär I
        </p>
        <p className="absolute text-xs md:text-sm font-semibold text-orange-400 z-10 top-[70%] left-[45%]">
          Bipolär II
        </p>
        <p className="absolute text-xs md:text-sm font-semibold text-blue-500 z-10 top-[30%] right-[18%]">
          Cyklotymi
        </p>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={GRAPH_DATA}
            margin={{ top: 30, right: 0, left: -30, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              strokeWidth={1}
              horizontal={true}
              vertical={false}
              horizontalPoints={[-20, -40]}
            />
            <ReferenceLine
              y={0}
              stroke="#659598"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <XAxis
              dataKey="time"
              axisLine={true}
              tickLine={false}
              tick={false}
              label={{
                value: 'Tid',
                position: 'insideBottom',
                offset: -10,
                style: {
                  textAnchor: 'middle',
                  fontSize: '14px',
                  fill: '#19505b',
                },
              }}
            />
            <YAxis
              domain={[-60, 45]}
              ticks={[-40, -20, 0, 20, 40]}
              tickFormatter={formatYAxisTick}
              axisLine={true}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#19505b', fontWeight: 'semibold' }}
              width={isMobile ? 40 : 100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '13px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelFormatter={() => ''}
              formatter={formatTooltip}
            />
            <Line
              type="natural"
              dataKey="bipolar1"
              stroke="#f87171"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#f87171' }}
            />
            <Line
              type="natural"
              dataKey="bipolar2"
              stroke="#fb923c"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#fb923c' }}
            />
            <Line
              type="natural"
              dataKey="cyclothymia"
              stroke="#519dfa"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#519dfa' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiagnosesChart;
