'use client';

import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  FaBed,
  FaCalendarAlt,
  FaCog,
  FaFire,
  FaFrown,
  FaGrinBeam,
  FaLaughBeam,
  FaMeh,
  FaNotesMedical,
  FaSadTear,
  FaSmile,
  FaUserFriends,
} from 'react-icons/fa';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Spinner from '../components/shared/Spinner';

import DashboardCardWrapper from '../components/dashboard/DashboardCardWrapper';
import MoodScoreScale from '../components/dashboard/MoodScoreScale';
import { ANXIETY_COLORS } from '../data/dashboardColors';
import { WEIGHTS } from '../data/dashboardWeights';
import { ICustomSession } from '../types/authoptions';
import { IMoodValue } from '../types/moodtracker';
import { IUserWithMoodTracker } from '../types/user';
import {
  convertMedicineFrequencyToSwedishString,
  moodScoreColor,
  renderMessage,
} from '../utils/dashboardUtils';
import { roundToNearestHalf } from '../utils/numberUtils';

const MyPage = () => {
  const { data: session } = useSession() as { data: ICustomSession | null };
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<IUserWithMoodTracker | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!session?.user?.email) return;

        const response: AxiosResponse<IUserWithMoodTracker> = await axios.post(
          '/api/user',
          {
            email: session.user.email,
          }
        );

        if (response.status === 200) {
          setUserData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  const isThereAnyMoodTrackerData = (id: string): boolean => {
    const mood = userData?.moodTrackerData
      .flatMap((week) => week.mood_values)
      .find((mood) => mood.id === id);

    return mood?.valueForDays.some((day) => day.value !== null) ?? false;
  };

  const calculateSleepAverage = (): number | null => {
    const sleepMood = userData?.moodTrackerData
      .flatMap((week) => week.mood_values)
      .find((mood) => mood.id === 'sleep');

    if (!sleepMood) return null;

    const validDays = sleepMood.valueForDays.filter(
      (day) => day.value !== null && day.value >= 0
    );

    if (validDays.length === 0) return null;

    const totalSleep = validDays.reduce(
      (sum, day) => sum + (day.value || 0),
      0
    );
    return totalSleep / validDays.length;
  };

  const transformSleepData = (): { date: string; value: number }[] => {
    const sleepMood = userData?.moodTrackerData
      .flatMap((week) => week.mood_values)
      .find((mood) => mood.id === 'sleep');

    return (
      sleepMood?.valueForDays
        .filter((day) => day.value !== null)
        .map((day) => ({
          date: new Date(day.date).toLocaleDateString('sv-SE', {
            day: '2-digit',
            month: 'short',
          }),
          value: day.value!,
        })) || []
    );
  };

  const calculateMoodScore = (
    moodData: IMoodValue[] | undefined,
    weights: { [key: string]: number }
  ): number => {
    let totalScore = 0;
    let totalWeight = 0;

    moodData?.forEach((mood) => {
      const maxScale = mood.yAxis.length - 1;
      const validValues = mood.valueForDays
        .filter((day) => day.value !== null)
        .map((day) => day.value! / maxScale);

      if (validValues.length > 0) {
        const average =
          validValues.reduce((sum, value) => sum + value, 0) /
          validValues.length;

        totalScore += average * (weights[mood.id] || 0);
        totalWeight += weights[mood.id] || 0;
      }
    });

    return totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
  };

  const sleepAverage = calculateSleepAverage();
  const sleepData = transformSleepData();
  const moodValues = userData?.moodTrackerData.flatMap(
    (week) => week.mood_values
  );

  const moodScore = Math.round(calculateMoodScore(moodValues, WEIGHTS));

  const normalizedAnxietyData = (() => {
    const anxietyMood = userData?.moodTrackerData
      .flatMap((week) => week.mood_values)
      .find((mood) => mood.id === 'anxiety');

    const anxietyDistribution = anxietyMood
      ? anxietyMood.yAxis.map((level, index) => {
          const count = anxietyMood.valueForDays.filter(
            (day) => day.value === index
          ).length;
          return { name: level, value: count };
        })
      : [];

    const totalAnxietyCount = anxietyDistribution.reduce(
      (sum, level) => sum + level.value,
      0
    );

    return anxietyDistribution.map((level) => ({
      name: level.name,
      value: parseFloat(((level.value / totalAnxietyCount) * 100).toFixed(1)),
    }));
  })();

  const ANXIETY_ICONS = [
    FaLaughBeam,
    FaGrinBeam,
    FaSmile,
    FaMeh,
    FaFrown,
    FaSadTear,
  ];

  const calculateDailyAverageMood = () => {
    const daysOfWeek = [
      'måndag',
      'tisdag',
      'onsdag',
      'torsdag',
      'fredag',
      'lördag',
      'söndag',
    ];
    const averages = daysOfWeek.map((day, index) => {
      const englishDays = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ];
      const dayMoods = moodValues
        ?.map((mood) => {
          const dayData = mood.valueForDays.find(
            (d) => d.id === englishDays[index]
          );
          if (dayData?.value === null) return null;
          return {
            value: dayData?.value || 0,
            maxScale: mood.yAxis.length - 1,
          };
        })
        .filter((m) => m !== null);

      const avgMood = dayMoods?.reduce((acc, curr) => {
        if (!curr) return acc;
        return acc + curr.value / curr.maxScale;
      }, 0);

      return {
        day: day,
        average: dayMoods?.length
          ? ((avgMood || 0) / dayMoods.length) * 100
          : 0,
      };
    });

    return averages;
  };

  const calculateLongestStreak = () => {
    let currentStreak = 0;
    let longestStreak = 0;

    const allDays = moodValues?.[0]?.valueForDays || [];

    allDays.forEach((day) => {
      const hasEntries = moodValues?.some((mood) => {
        const dayData = mood.valueForDays.find((d) => d.id === day.id);
        return dayData?.value !== null;
      });

      if (hasEntries) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });

    return longestStreak;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="w-full h-full bg-tertiary-light py-10 px-4 md:px-10 ">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8 lg:pr-20 relative overflow-hidden ">
          <div className="relative z-10">
            <h1 className="text-3xl font-semibold text-secondary-dark mb-3">
              Välkommen tillbaka, {session?.user?.name}!
            </h1>
            <p className="text-gray-600 text-lg w-full">
              Ta en stund att reflektera över hur du mår idag. Din mentala hälsa
              är viktig.
            </p>
            <div className="flex flex-col">
              <div className="mt-6 flex-col sm:flex-row flex items-center">
                <span
                  style={{ color: moodScoreColor(moodScore) }}
                  className={`text-2xl font-semibold mr-4 `}
                >
                  Moodscore: {moodScore}
                </span>

                <div className="h-2 flex-grow bg-primary-medium/60 rounded-full mt-4 sm:mt-0 w-full sm:w-auto overflow-hidden">
                  <div
                    className={`h-full w-full `}
                    style={{
                      width: `${moodScore}%`,
                      backgroundColor: moodScoreColor(moodScore),
                    }}
                  ></div>
                </div>
              </div>
              {userData?.moodTrackerData && (
                <p className="text-gray-600 text-sm mt-1">
                  {renderMessage(moodScore, userData?.moodTrackerData)}
                </p>
              )}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light rounded-full  transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-tertiary-light rounded-full  transform translate-x-8 translate-y-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <DashboardCardWrapper title="Mediciner" icon={FaNotesMedical}>
            {userData?.profile?.medications.length &&
            userData?.profile?.medications.length > 0 ? (
              userData?.profile?.medications.map((medication) => (
                <div
                  key={medication.name}
                  className="bg-primary-light rounded-xl p-4 mb-3 last:mb-0 "
                >
                  <div className="flex justify-between items-center">
                    <p className="text-primary-dark font-semibold">
                      {medication.name}
                    </p>
                    <span className="text-primary-medium text-sm">
                      {medication.dosage} {medication.doseUnit}
                    </span>
                  </div>
                  <p className="text-primary-medium text-sm mt-1">
                    {convertMedicineFrequencyToSwedishString(
                      medication.frequency
                    )}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-primary-medium text-sm mt-1">
                Inga mediciner registrerade
              </p>
            )}
          </DashboardCardWrapper>

          <DashboardCardWrapper title="Anhöriga" icon={FaUserFriends}>
            {userData?.settings.relatives.length &&
            userData?.settings.relatives.length > 0 ? (
              userData?.settings.relatives.map((relative, index) => (
                <div
                  key={index}
                  className="bg-primary-light rounded-xl p-4 mb-3 last:mb-0"
                >
                  <p className="text-primary-dark font-semibold">
                    {relative.email}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-primary-dark text-sm mt-1">
                Inga anhöriga registrerade
              </p>
            )}
          </DashboardCardWrapper>

          <DashboardCardWrapper title="Notifikationer" icon={FaCog}>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-primary-light rounded-xl p-4">
                <p
                  className={`
                ${
                  userData?.settings?.notifications_enabled
                    ? 'text-primary-accent'
                    : 'text-tertiary-dark'
                }
              `}
                >
                  {userData?.settings?.notifications_enabled
                    ? 'Aktiverade'
                    : 'Inaktiverade'}
                </p>
              </div>
            </div>
          </DashboardCardWrapper>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <DashboardCardWrapper
            title="Ångestnivåer"
            icon={FaFrown}
            className="md:row-span-2 lg:col-span-1"
          >
            {isThereAnyMoodTrackerData('anxiety') ? (
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
                      const radius =
                        25 + innerRadius + (outerRadius - innerRadius);
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
                              color:
                                ANXIETY_COLORS[index % ANXIETY_COLORS.length],
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
            ) : (
              <p className="text-primary-medium text-sm mt-1">
                Ingen ångest data registrerad
              </p>
            )}
          </DashboardCardWrapper>
          <DashboardCardWrapper title="Sömn" icon={FaBed} className="h-full">
            {isThereAnyMoodTrackerData('sleep') ? (
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
            ) : (
              <p className="text-primary-medium text-sm mt-1">
                Ingen sömn data registrerad
              </p>
            )}
            {sleepAverage !== null && (
              <div className="mt-4 p-4 bg-primary-light rounded-lg border border-primary-border">
                <p className="text-primary-dark">
                  <span className="font-semibold">
                    Genomsnittlig sömn (senaste 30 dagarna):{' '}
                  </span>
                  {roundToNearestHalf(sleepAverage)} timmar
                </p>
              </div>
            )}
          </DashboardCardWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md md:col-span-3">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-primary-accent text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-secondary-dark">
                Dagligt Mående
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={calculateDailyAverageMood()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value: number) => [
                    `${Math.round(value)}%`,
                    'Mående',
                  ]}
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="average" fill="#46737c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <FaFire className="text-orange-500 text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-secondary-dark">
                Nuvarande Svit
              </h3>
            </div>
            <p className="text-4xl font-bold text-primary-dark">
              {calculateLongestStreak()}{' '}
              {calculateLongestStreak() === 1 ? 'dag' : 'dagar'}
            </p>
            <p className="text-gray-600 mt-2">
              Längsta period med registrerad data
            </p>
          </div>
        </div>

        <MoodScoreScale />
      </div>
    </section>
  );
};

export default MyPage;
