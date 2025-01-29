'use client';

import MoodTrackerDay from '@/app/components/dashboard/moodtracker/MoodTrackerDay';
import MoodTrackerWeek from '@/app/components/dashboard/moodtracker/MoodTrackerWeek';
import Spinner from '@/app/components/shared/Spinner';
import { MoodValue, MoodtrackerWeek } from '@/app/models/Moodtracker';
import { ICustomSession } from '@/app/types/authoptions';
import { DayId, IMoodTrackerWeek, MoodId } from '@/app/types/moodtracker';
import { getWeekNumber } from '@/app/utils/dateUtils';
import axios from 'axios';
import { addDays, isFuture, subDays } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const initialMoodValues = MoodValue.createDefaultMoodValues();

const MoodTrackerPage = () => {
  const { data: session } = useSession() as { data: ICustomSession | null };
  const [moodTrackerValues, setMoodTrackerValues] =
    useState<MoodValue[]>(initialMoodValues);
  const [isLoading, setIsLoading] = useState(true);
  const [isDayView, setIsDayView] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchMoodTrackerData = async (date: Date) => {
    if (!session?.user?.id) return;

    try {
      const week = getWeekNumber(date);
      const year = date.getFullYear();

      const response = await axios.post('/api/mood-tracker/get', {
        user_id: session.user.id,
        week,
        year,
      });

      if (response.status === 200) {
        const rawData: IMoodTrackerWeek = response.data;
        if (rawData) {
          const data = new MoodtrackerWeek(rawData);
          setMoodTrackerValues(data.mood_values);
        } else {
          const defaultWeek = MoodtrackerWeek.createDefault(
            session.user.id,
            date
          );
          setMoodTrackerValues(defaultWeek.mood_values);
        }
      }
    } catch (error) {
      console.error('Failed to fetch mood tracker data:', error);
      toast.error('Kunde inte hämta information om ditt mående');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodTrackerData(selectedDate);
  }, [session, selectedDate]);

  const handlePreviousDay = () => {
    const newDate = subDays(selectedDate, 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const nextDay = addDays(selectedDate, 1);
    if (!isFuture(nextDay)) {
      setSelectedDate(nextDay);
    }
  };

  const saveMoodTrackerData = async () => {
    if (!session?.user?.id) return;

    try {
      const weekData = {
        week_number: getWeekNumber(selectedDate),
        year: selectedDate.getFullYear(),
        mood_values: moodTrackerValues,
      };

      const response = await axios.post('/api/mood-tracker/save', {
        user_id: session.user.id,
        weekData,
      });

      if (response.status !== 200) {
        throw new Error('Failed to save mood tracker data');
      }

      toast.success('Ditt mående sparades');
    } catch (err) {
      console.error('Failed to save mood tracker data:', err);
      toast.error('Kunde inte spara ditt mående');
    }
  };

  useEffect(() => {
    /**
     * This effect is used to save the mood tracker data when the user leaves the page.
     * This prevents the user from losing their data if they leave the page without saving.
     * @param event - The event object.
     */
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      try {
        await saveMoodTrackerData();
      } catch (error) {
        console.error('Failed to save mood tracker data:', error);

        event.preventDefault();
        event.returnValue =
          'Det gick inte att spara dina ändringar. Vill du verkligen lämna sidan?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [moodTrackerValues, selectedDate]);

  const handleValueChange = (
    moodId: MoodId,
    dayId: DayId,
    level: number | null,
    date: string
  ) => {
    setMoodTrackerValues((prevValues) => {
      return prevValues.map((mood) => {
        if (mood.id === moodId) {
          return {
            ...mood,
            valueForDays: mood.valueForDays.map((day) => {
              if (day.date === date) {
                return { ...day, value: level };
              }
              return day;
            }),
          };
        }
        return mood;
      });
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="w-full px-2 md:px-10 py-12 min-h-screen bg-tertiary-light">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-8 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              isDayView
                ? 'bg-primary-dark text-white shadow-lg'
                : 'bg-white text-primary-dark hover:bg-primary-light'
            }`}
            onClick={() => setIsDayView(true)}
          >
            Dagvy
          </button>
          <button
            className={`px-8 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              !isDayView
                ? 'bg-primary-dark text-white shadow-lg'
                : 'bg-white text-primary-dark hover:bg-primary-light'
            }`}
            onClick={() => setIsDayView(false)}
          >
            Veckovy
          </button>
        </div>
      </div>
      {isDayView ? (
        <MoodTrackerDay
          moodTrackerValues={moodTrackerValues}
          handleValueChange={handleValueChange}
          saveMoodTrackerData={saveMoodTrackerData}
          user={session?.user.name || ''}
          selectedDate={selectedDate}
          onPreviousDay={handlePreviousDay}
          onNextDay={handleNextDay}
        />
      ) : (
        <MoodTrackerWeek
          moodTrackerValues={moodTrackerValues}
          handleValueChange={handleValueChange}
          saveMoodTrackerData={saveMoodTrackerData}
          user={session?.user.name || ''}
        />
      )}
    </section>
  );
};

export default MoodTrackerPage;
