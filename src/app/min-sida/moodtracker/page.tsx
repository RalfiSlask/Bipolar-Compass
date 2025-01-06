'use client';

import MoodTrackerCheckboxes from '@/app/components/dashboard/moodtracker/MoodTrackerCheckboxes';
import MoodYaxisValues from '@/app/components/dashboard/moodtracker/MoodYaxisValues';
import Spinner from '@/app/components/shared/Spinner';
import { moodTrackerValuesData } from '@/app/data/moodtracker';
import { MoodValue, MoodtrackerWeek } from '@/app/models/Moodtracker';
import { ICustomSession } from '@/app/types/authoptions';
import { DayId, IMoodTrackerWeek, MoodId } from '@/app/types/moodtracker';
import { getWeekDates, getWeekNumber } from '@/app/utils/dateUtils';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const moodValuesData = moodTrackerValuesData.moodValues.map(
  (value) =>
    new MoodValue({
      ...value,
      id: value.id as MoodId,
      valueForDays: value.valueForDays.map((day) => ({
        ...day,
        id: day.id as DayId,
      })),
    })
);

const MoodTrackerPage = () => {
  const { data: session } = useSession() as { data: ICustomSession | null };
  const [weekDates, setWeekDates] = useState<string[]>([]);
  const [moodTrackerValues, setMoodTrackerValues] =
    useState<MoodValue[]>(moodValuesData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentDate = new Date();
    const dates = getWeekDates(currentDate);
    setWeekDates(dates);
  }, []);

  useEffect(() => {
    const fetchMoodTrackerData = async () => {
      if (!session?.user?.id) return;

      try {
        const currentDate = new Date();
        const currentWeek = getWeekNumber(currentDate);
        const currentYear = currentDate.getFullYear();

        const response = await axios.post('/api/mood-tracker/get', {
          user_id: session.user.id,
          week: currentWeek,
          year: currentYear,
        });

        if (response.status === 200) {
          console.log('this is the response:', response.data);
          const rawData: IMoodTrackerWeek = response.data;
          console.log('this is the raw data:', rawData);
          const data = new MoodtrackerWeek(rawData);
          if (data && data.mood_values) {
            setMoodTrackerValues(
              data.mood_values.map((value) => new MoodValue(value))
            );
          }
        }
      } catch (error) {
        console.error('Failed to fetch mood tracker data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoodTrackerData();
  }, [session]);

  const saveMoodTrackerData = async () => {
    if (!session?.user?.id) return;

    try {
      const currentDate = new Date();
      const weekData = {
        week_number: getWeekNumber(currentDate),
        year: currentDate.getFullYear(),
        mood_values: moodTrackerValues,
      };

      const response = await axios.post('/api/mood-tracker/save', {
        user_id: session.user.id,
        weekData,
      });

      if (response.status !== 200) {
        throw new Error('Failed to save mood tracker data');
      }
    } catch (err) {
      console.error('Failed to save mood tracker data:', err);
    }
  };

  const handleValueChange = (moodId: MoodId, dayId: DayId, level: number) => {
    setMoodTrackerValues((prevValues) => {
      return prevValues.map((mood) => {
        if (mood.id === moodId) {
          return {
            ...mood,
            valueForDays: mood.valueForDays.map((day) => {
              if (day.id === dayId) {
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
    <section className="p-8 bg-beige min-h-screen">
      <h1 className="text-2xl font-bold text-primary-dark mb-8">Moodtracker</h1>
      {moodTrackerValues.map((mood) => (
        <div key={mood.id} className="mb-8">
          <h2 className="font-semibold mb-4 text-primary-dark">
            {mood.moodName}
          </h2>
          <div className="grid grid-cols-[150px_repeat(7,1fr)] gap-4">
            <MoodYaxisValues moodValue={mood} />
            {mood.valueForDays.map((day, index) => (
              <div key={day.id} className="flex flex-col">
                <div className="text-sm text-primary-medium text-center mb-4">
                  {day.name}
                  <br />
                  {weekDates[index]}
                </div>

                {/* Checkboxes */}
                <MoodTrackerCheckboxes
                  mood={mood}
                  day={day}
                  handleValueChange={handleValueChange}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="primary-button" onClick={saveMoodTrackerData}>
        Spara
      </button>
    </section>
  );
};

export default MoodTrackerPage;
