'use client';

import HistoryLineChart from '@/app/components/dashboard/history/HistoryLineChart';
import NoHistoryData from '@/app/components/dashboard/history/ui/NoHistoryData';
import ScrollToTop from '@/app/components/shared/ScrollToTop';
import Spinner from '@/app/components/shared/Spinner';
import { ICustomSession } from '@/app/types/authoptions';
import { IMoodTrackerWeek } from '@/app/types/moodtracker';
import {
  getHistoryChartData,
  getHistoryChartTip,
  getLatestAverage,
} from '@/app/utils/historyUtils';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  BsCalendar3,
  BsCalendar3Fill,
  BsCalendar3Range,
  BsCalendar3Week,
} from 'react-icons/bs';
import { FaChartLine } from 'react-icons/fa';

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getHistoryChartIcon = (tab: string) => {
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
              {getHistoryChartIcon(tab)}
              <span className="whitespace-nowrap">{tab}</span>
            </button>
          ))}
        </div>

        {moodTrackerData.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 md:gap-8">
            {moodTrackerData[0]?.mood_values.map((mood, index) => {
              const chartData = getHistoryChartData(
                index,
                moodTrackerData,
                activeTab
              );
              const average = getLatestAverage(chartData);
              const tip = getHistoryChartTip(
                mood.id,
                average,
                chartData.length
              );
              return (
                <HistoryLineChart
                  key={mood.id}
                  chartData={chartData}
                  index={index}
                  moodTrackerData={moodTrackerData}
                  activeTab={activeTab}
                  tip={tip || ''}
                />
              );
            })}
          </div>
        ) : (
          <NoHistoryData />
        )}
        {showScrollTop && <ScrollToTop scrollToTop={scrollToTop} />}
      </div>
    </div>
  );
};

export default HistoryPage;
