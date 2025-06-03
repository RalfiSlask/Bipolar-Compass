'use client';

import { CHART_COLORS } from '@/app/data/chartColors';
import { IHistoryChartDataPoint } from '@/app/types/history';
import { IMoodTrackerWeek } from '@/app/types/moodtracker';
import {
  formatHistoryChartTooltipValue,
  formatXAxis,
  getTickInterval,
  getYAxisDomain,
  getYAxisTicks,
} from '@/app/utils/historyUtils';
import { getMoodIcon } from '@/app/utils/moodtrackerUtils';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ToolTip from './ToolTip';

interface IHistoryLineChartProps {
  chartData: IHistoryChartDataPoint[];
  index: number;
  moodTrackerData: IMoodTrackerWeek[];
  activeTab: string;
  tip: string;
}

const HistoryLineChart = ({
  chartData,
  index,
  moodTrackerData,
  activeTab,
  tip,
}: IHistoryLineChartProps) => {
  const mood = moodTrackerData[0]?.mood_values[index];

  return (
    <div
      key={mood.id}
      className="p-3 sm:p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary-dark mb-3 sm:mb-4 md:mb-6 flex items-center gap-2">
        {getMoodIcon(mood.moodName)}
        {mood.moodName}
      </h3>
      <div className="w-full overflow-x-auto -mx-3 px-3">
        {chartData.length === 0 ? (
          <div className="text-center text-dark p-4 text-sm sm:text-base">
            Ingen data registrerad för denna period
          </div>
        ) : chartData.length < 2 ? (
          <div className="text-center text-dark p-4 text-sm sm:text-base">
            Minst två datapunkter krävs för att visa en graf
          </div>
        ) : (
          <div className="min-w-[300px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={CHART_COLORS[index]}
                  strokeWidth={2}
                  dot={{ fill: CHART_COLORS[index], r: 4 }}
                  activeDot={{ r: 6, fill: CHART_COLORS[index] }}
                  connectNulls={false}
                />
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
                  interval={getTickInterval(chartData.length, activeTab)}
                  tickFormatter={(tickItem) => formatXAxis(tickItem, activeTab)}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  width={100}
                  domain={getYAxisDomain(index, moodTrackerData)}
                  ticks={getYAxisTicks(index, moodTrackerData)}
                  tickFormatter={(value) => {
                    if (mood?.yAxis) {
                      return mood.yAxis[value] || value.toString();
                    }
                    return value.toString();
                  }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ fontSize: '14px' }}
                  labelFormatter={(label) => `Datum: ${label}`}
                  formatter={(value: number) =>
                    formatHistoryChartTooltipValue(
                      value,
                      mood?.moodName || '',
                      mood?.yAxis
                    )
                  }
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      {tip && <ToolTip chartData={chartData} tip={tip} />}
    </div>
  );
};

export default HistoryLineChart;
