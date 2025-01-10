'use client';

import { CHART_COLORS } from '@/app/data/chartColors';
import { ICustomSession } from '@/app/types/authoptions';
import { DayId, IMoodTrackerWeek } from '@/app/types/moodtracker';
import {
  formatXAxis,
  getTickInterval,
  getYAxisDomain,
  getYAxisTicks,
} from '@/app/utils/historyUtils';
import axios from 'axios';
import { format, isAfter, subDays, subMonths, subYears } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
const HistoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession() as { data: ICustomSession | null };
  const [moodTrackerData, setMoodTrackerData] = useState<IMoodTrackerWeek[]>(
    []
  );

  const activeTabs = ['vecka', 'månad', '1 år', 'alla data'] as const;
  const [activeTab, setActiveTab] = useState<(typeof activeTabs)[number]>(
    activeTabs[0]
  );

  useEffect(() => {
    const fetchMoodTrackerData = async () => {
      setIsLoading(true);
      if (!session?.user?.id) {
        console.log('No user ID available:', session);
        return;
      }

      try {
        console.log('Sending request with user_id:', session.user.id);
        const response = await axios.post('/api/history', {
          user_id: session.user.id,
        });
        if (response.data) {
          setMoodTrackerData(response.data);
        }
        console.log('Response data:', response.data);
      } catch (err) {
        console.error('Error fetching mood tracker data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoodTrackerData();
  }, [session]);

  const getLatestAverage = (data: IFilteredData[], days: number = 7) => {
    const recentData = data.slice(-days);
    if (recentData.length < 7) return null;
    return (
      recentData.reduce((sum, item) => sum + item.value, 0) / recentData.length
    );
  };

  const getTip = (moodId: string, average: number | null): string | null => {
    console.log(average, moodId);
    if (average === null) return null;

    switch (moodId) {
      case 'anxiety':
        return average > 4
          ? 'Tips: Prata med någon du litar på. Meditera eller gör något du tycker är lugnande för kroppen. Överväg att kontakta en terapeut.'
          : null;
      case 'stress':
        return average > 4
          ? 'Tips: Prova meditation eller djupandning. Ta regelbundna pauser i arbetet.'
          : null;
      case 'depression':
        return average > 4
          ? 'Tips: Prata med någon du litar på. Överväg att kontakta en terapeut.'
          : null;
      case 'energy':
        return average < 3
          ? 'Tips: Försök att få regelbunden sömn och rörelse. Ta korta promenader under dagen.'
          : null;
      case 'physical':
        return average < 1
          ? 'Tips: Börja med korta promenader. Sätt upp små, uppnåbara träningsmål.'
          : null;
      case 'social':
        return average < 2
          ? 'Tips: Försök att ta små sociala initiativ. Ring en vän eller familjemedlem.'
          : null;
      case 'sleep':
        return average < 6
          ? 'Tips: Försök att hålla regelbundna sovtider. Undvik skärmar innan läggdags.'
          : null;
      default:
        return null;
    }
  };

  const transformMoodData = (moodIndex: number): IFilteredData[] => {
    return moodTrackerData
      .flatMap((week) =>
        week.mood_values[moodIndex]?.valueForDays
          .filter((day) => day.date)
          .map((day) => {
            try {
              const dateObj = new Date(day.date);
              if (isNaN(dateObj.getTime())) {
                console.warn(`Invalid date found: ${day.date}`);
                return null;
              }

              return {
                date: format(dateObj, 'd/M', { locale: sv }),
                value: day.value,
                id: day.id,
                name: week.mood_values[moodIndex].moodName,
              };
            } catch (error) {
              console.warn(`Error processing date ${day.date}:`, error);
              return null;
            }
          })
      )
      .filter((item): item is IFilteredData => item !== null)
      .sort((a, b) => {
        const [dayA, monthA] = a.date.split('/').map(Number);
        const [dayB, monthB] = b.date.split('/').map(Number);
        if (monthA !== monthB) return monthA - monthB;
        return dayA - dayB;
      });
  };

  interface IFilteredData {
    date: string;
    value: number;
    id: DayId;
    name: string;
  }

  const getFilteredData = (moodIndex: number): IFilteredData[] => {
    const today = new Date();
    let filterDate = today;
    const endDate = today;

    switch (activeTab) {
      case 'vecka':
        filterDate = subDays(today, 7);
        break;
      case 'månad':
        filterDate = subMonths(today, 1);
        break;
      case '1 år':
        filterDate = subYears(today, 1);
        break;
      case 'alla data':
        return transformMoodData(moodIndex);
    }

    const allData = transformMoodData(moodIndex);
    const filteredData = allData.filter((item) => {
      const [day, month] = item?.date.split('/').map(Number);
      const currentYear = new Date().getFullYear();
      let itemDate = new Date(currentYear, month - 1, day);

      if (isAfter(itemDate, today)) {
        itemDate = new Date(currentYear - 1, month - 1, day);
      }

      return itemDate >= filterDate && itemDate <= endDate;
    });

    return filteredData.sort((a, b) => {
      const [dayA, monthA] = a?.date.split('/').map(Number);
      const [dayB, monthB] = b?.date.split('/').map(Number);
      const dateA = new Date(new Date().getFullYear(), monthA - 1, dayA);
      const dateB = new Date(new Date().getFullYear(), monthB - 1, dayB);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const formatTooltipValue = (
    value: number,
    moodName: string,
    yAxis?: string[]
  ) => {
    if (
      yAxis &&
      typeof value === 'number' &&
      value >= 0 &&
      value < yAxis.length
    ) {
      return [yAxis[value] || value.toString(), moodName];
    }
    return [value, moodName];
  };

  if (isLoading) {
    return <p>Laddar...</p>;
  }

  return (
    <div>
      <h2 className="h-md text-primary-dark">Historik</h2>
      <div className="flex gap-8 mb-8">
        {activeTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`quartiary-button py-[6px] ${
              activeTab === tab ? 'active' : ''
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {moodTrackerData.length > 0 ? (
        <div className="flex flex-col gap-8">
          {moodTrackerData[0]?.mood_values.map((mood, index) => {
            const filteredData = getFilteredData(index);
            const average = getLatestAverage(filteredData);
            const tip = getTip(mood.id, average);

            return (
              <div key={mood.id} className="mb-12 max-w-[800px]">
                <h3 className="text-xl font-semibold text-center mb-4">
                  {mood.moodName}
                </h3>
                <LineChart width={800} height={300} data={filteredData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={CHART_COLORS[index]}
                    name={mood.moodName}
                  />
                  <CartesianGrid stroke="#ccc" strokeOpacity={0.3} />
                  <XAxis
                    dataKey="date"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={getTickInterval(
                      getFilteredData(index).length,
                      activeTab
                    )}
                    tickFormatter={(tickItem) => {
                      return formatXAxis(tickItem, activeTab);
                    }}
                  />
                  <YAxis
                    width={100}
                    domain={getYAxisDomain(index, moodTrackerData)}
                    ticks={getYAxisTicks(index, moodTrackerData)}
                    tickFormatter={(value) => {
                      if (mood.yAxis) {
                        return mood.yAxis[value] || value.toString();
                      }
                      return value.toString();
                    }}
                  />
                  <Tooltip
                    labelFormatter={(label) => `Datum: ${label}`}
                    formatter={(value: number) =>
                      formatTooltipValue(value, mood.moodName, mood.yAxis)
                    }
                  />
                </LineChart>
                {tip && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-800">
                      <span className="font-semibold">💡 </span>
                      {tip}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>Ingen data tillgänglig</div>
      )}
    </div>
  );
};

export default HistoryPage;
