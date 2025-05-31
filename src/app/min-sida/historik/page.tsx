'use client';

import Spinner from '@/app/components/shared/Spinner';
import { CHART_COLORS } from '@/app/data/chartColors';
import { ICustomSession } from '@/app/types/authoptions';
import { DayId, IMoodTrackerWeek } from '@/app/types/moodtracker';
import {
  formatXAxis,
  getTickInterval,
  getYAxisDomain,
  getYAxisTicks,
} from '@/app/utils/historyUtils';
import { getMoodIcon } from '@/app/utils/moodtrackerUtils';
import axios from 'axios';
import { format, isAfter, subDays, subMonths, subYears } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  BsCalendar3,
  BsCalendar3Fill,
  BsCalendar3Range,
  BsCalendar3Week,
} from 'react-icons/bs';
import { FaArrowUp, FaChartLine } from 'react-icons/fa';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface IFilteredData {
  date: string;
  value: number;
  id: DayId;
  name: string;
}

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
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchMoodTrackerData = async () => {
      setIsLoading(true);
      if (!session?.user?.id) {
        return;
      }

      try {
        const response = await axios.post('/api/history', {
          user_id: session.user.id,
        });
        if (response.data) {
          setMoodTrackerData(response.data);
        }
      } catch (err) {
        console.error('Error fetching mood tracker data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoodTrackerData();
  }, [session]);

  const getLatestAverage = (data: IFilteredData[]) => {
    if (data.length === 0) return null;
    return data.reduce((sum, item) => sum + item.value, 0) / data.length;
  };

  /**
   * This function is used to get the tip for a mood based on the average value of the mood.
   * If the data length is less than 3, it returns a message to the user to continue registering their mood.
   * If the average value is greater than 4, it returns a tip to the user to improve their mood.
   * @param moodId - The id of the mood to get the tip for.
   * @param average - The average value of the mood.
   * @param dataLength - The length of the data.
   * @returns {string | null} - The tip for the mood or null if there is no tip.
   */
  const getTip = (
    moodId: string,
    average: number | null,
    dataLength: number
  ): string | null => {
    if (average === null) return null;

    if (dataLength < 3) {
      return 'Fortsätt registrera ditt mående för att få anpassade tips och insikter.';
    }

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
  /**
   * This function is used to transform the mood data into a format that can be used to display in the chart.
   * It returns an array of objects with the date, value, id, and name of the mood.
   * @param moodIndex - The index of the mood to transform.
   * @returns {IFilteredData[]} - The transformed mood data.
   */
  const transformMoodData = (moodIndex: number): IFilteredData[] => {
    return moodTrackerData
      .flatMap((week) =>
        week.mood_values[moodIndex]?.valueForDays
          .filter(
            (day) => day.date && day.value !== null && day.value !== undefined
          )
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
      .filter((item): item is IFilteredData => item !== null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFilteredData = (moodIndex: number): IFilteredData[] => {
    const today = new Date();
    let filterDate = today;

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

    return (
      allData
        .filter((item) => {
          // first we filter out the data based on the date
          const [day, month] = item.date.split('/').map(Number);
          const currentYear = new Date().getFullYear();
          const itemDate = new Date(currentYear, month - 1, day);
          // if the item date is after today, we set the item date to the previous year
          const adjustedDate = isAfter(itemDate, today)
            ? new Date(currentYear - 1, month - 1, day)
            : itemDate;
          // if the adjusted date is after the filter date and before today, we return the item
          return adjustedDate >= filterDate && adjustedDate <= today;
        })
        // then we sort the data based on the date
        .sort((a, b) => {
          const [dayA, monthA] = a.date.split('/').map(Number);
          const [dayB, monthB] = b.date.split('/').map(Number);
          const dateA = new Date(new Date().getFullYear(), monthA - 1, dayA);
          const dateB = new Date(new Date().getFullYear(), monthB - 1, dayB);
          return dateA.getTime() - dateB.getTime();
        })
    );
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

  const getIcon = (tab: string) => {
    switch (tab) {
      case 'vecka':
        return <BsCalendar3Week />;
      case 'månad':
        return <BsCalendar3Range />;
      case '1 år':
        return <BsCalendar3Fill />;
      case 'alla data':
        return <BsCalendar3 />;
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full min-h-screen bg-tertiary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-8 sm:pb-[180px]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary-dark mb-4 flex items-center justify-center gap-2">
            <FaChartLine className="text-2xl sm:text-3xl" /> Historik
          </h2>
          <p className="text-dark max-w-2xl mx-auto text-sm sm:text-base px-4">
            Här kan du följa din måendehistorik över tid. Genom att analysera
            dina trender kan du bättre förstå ditt mående och få anpassade tips
            för förbättring.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
          {activeTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg 
                text-xs sm:text-sm md:text-base transition-all duration-300
                ${
                  activeTab === tab
                    ? 'bg-primary-dark text-white shadow-md'
                    : 'bg-white text-primary-dark hover:bg-primary-accent hover:text-white shadow-sm hover:shadow-md'
                }`}
            >
              {getIcon(tab)}
              <span className="whitespace-nowrap">{tab}</span>
            </button>
          ))}
        </div>

        {moodTrackerData.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 md:gap-8">
            {moodTrackerData[0]?.mood_values.map((mood, index) => {
              const filteredData = getFilteredData(index);
              const average = getLatestAverage(filteredData);
              const tip = getTip(mood.id, average, filteredData.length);

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
                    {filteredData.length === 0 ? (
                      <div className="text-center text-dark p-4 text-sm sm:text-base">
                        Ingen data registrerad för denna period
                      </div>
                    ) : filteredData.length < 2 ? (
                      <div className="text-center text-dark p-4 text-sm sm:text-base">
                        Minst två datapunkter krävs för att visa en graf
                      </div>
                    ) : (
                      <div className="min-w-[300px] w-full">
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart
                            data={filteredData}
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
                              interval={getTickInterval(
                                filteredData.length,
                                activeTab
                              )}
                              tickFormatter={(tickItem) =>
                                formatXAxis(tickItem, activeTab)
                              }
                              tick={{ fontSize: 12 }}
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
                              tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                              contentStyle={{ fontSize: '14px' }}
                              labelFormatter={(label) => `Datum: ${label}`}
                              formatter={(value: number) =>
                                formatTooltipValue(
                                  value,
                                  mood.moodName,
                                  mood.yAxis
                                )
                              }
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>

                  {tip && (
                    <div
                      className={`mt-4 p-3 sm:p-4 rounded-lg border text-sm sm:text-base
                      transition-all duration-300 hover:scale-[1.01]
                      ${
                        filteredData.length < 3
                          ? 'bg-primary-light/50 border-primary-border/50'
                          : 'bg-primary-light border-primary-border'
                      }`}
                    >
                      <p className="text-primary-dark">
                        <span className="font-semibold">
                          {filteredData.length < 3 ? '📝 ' : '💡 '}
                        </span>
                        {tip}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-dark p-6 sm:p-8 bg-white rounded-xl shadow-lg">
            <p className="mb-4 text-base sm:text-lg">Ingen data tillgänglig</p>
            <p className="text-xs sm:text-sm text-gray-500">
              Börja registrera ditt mående i Moodtracker för att se din historik
              här
            </p>
          </div>
        )}

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 
              bg-primary-dark hover:bg-primary-medium text-white 
              p-2 sm:p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl
              transition-all duration-300 animate-bounce z-50"
            aria-label="Tillbaka till toppen"
          >
            <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
