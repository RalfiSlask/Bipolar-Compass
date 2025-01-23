'use client';

import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
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
import VerficationMessage from '../components/shared/VerficationMessage';
import { ICustomSession } from '../types/authoptions';
import { IUserWithMoodTracker } from '../types/user';

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
        }
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  const calculateSleepAverage = () => {
    const sleepMood = userData?.moodTrackerData
      .flatMap((week) => week.mood_values)
      .find((mood) => mood.id === 'sleep');
    if (!sleepMood) return null;

    // Get current date
    const today = new Date();
    // Calculate date 30 days ago
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

    const validDays = sleepMood.valueForDays.filter(
      (day) =>
        day.value !== null &&
        day.value >= 0 &&
        new Date(day.date) >= thirtyDaysAgo
    );

    if (validDays.length === 0) return null;

    const totalSleep = validDays.reduce(
      (sum, day) => sum + (day.value || 0),
      0
    );
    return totalSleep / validDays.length;
  };

  const sleepAverage = calculateSleepAverage();

  console.log(sleepAverage);

  const transformSleepData = () => {
    return userData?.moodTrackerData
      .flatMap((week) =>
        week.mood_values
          .find((mood) => mood.id === 'sleep')
          ?.valueForDays.filter(
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
                date: new Date(day.date).toLocaleDateString('sv-SE', {
                  day: 'numeric',
                  month: 'short',
                }),
                value: day.value,
              };
            } catch (error) {
              console.warn(`Error processing date ${day.date}:`, error);
              return null;
            }
          })
      )
      .filter((item): item is { date: string; value: number } => item !== null)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const sleepData = transformSleepData() || [];

  console.log(sleepData);

  console.log(userData?.moodTrackerData);

  const onlyTheMoodTrackerData = userData?.moodTrackerData.flatMap((week) =>
    week.mood_values.find((mood) => mood.id === 'sleep')
  );

  console.log(onlyTheMoodTrackerData);

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

  const normalizedAnxietyData = anxietyDistribution.map((level) => ({
    name: level.name,
    value: parseFloat(((level.value / totalAnxietyCount) * 100).toFixed(1)),
  }));

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#FF6384',
    '#36A2EB',
  ];

  const ICONS = [FaLaughBeam, FaGrinBeam, FaSmile, FaMeh, FaFrown, FaSadTear];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="w-full px-6 py-12 min-h-screen bg-tertiary-light">
      {session?.user?.isVerified ? null : <VerficationMessage />}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold text-secondary-dark mb-3">
              Välkommen tillbaka, {session?.user?.name}!
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              Ta en stund att reflektera över hur du mår idag. Din mentala hälsa
              är viktig, och genom att följa dina mönster kan du bättre förstå
              dig själv.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light rounded-full  transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-tertiary-light rounded-full  transform translate-x-8 translate-y-8"></div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Profil
          </h2>
          <p className="text-primary-medium">Namn: {userData?.name}</p>
          <p className="text-primary-medium">Email: {userData?.email}</p>
          <p className="text-primary-medium">
            Verifierad: {userData?.isVerified ? 'Ja' : 'Nej'}
          </p>
          <p className="text-primary-medium">
            Skapad:{' '}
            {userData?.created_at
              ? new Date(userData.created_at).toLocaleDateString('sv-SE')
              : ''}
          </p>
        </div>

        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Dina mediciner
          </h2>
          {userData?.profile?.medications.map((medication, index) => (
            <div key={index} className="mb-4">
              <p className="text-primary-medium">Namn: {medication.name}</p>
              <p className="text-primary-medium">
                Dosering: {medication.dosage} {medication.doseUnit}
              </p>
              <p className="text-primary-medium">
                Frekvens: {medication.frequency}
              </p>
              <p className="text-primary-medium">
                Påminnelse:{' '}
                {medication.reminder.enabled ? 'Aktiverad' : 'Inaktiverad'}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Dina Anhöriga
          </h2>
          {userData?.settings.relatives.map((relative, index) => (
            <div key={index} className="mb-4">
              <p className="text-primary-medium">Namn: {relative.email}</p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Sömn (h)
          </h2>
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
          {sleepAverage !== null && (
            <div className="mt-4 p-4 bg-primary-light rounded-lg border border-primary-border">
              <p className="text-primary-dark">
                <span className="font-semibold">
                  Genomsnittlig sömn (senaste 30 dagarna):{' '}
                </span>
                {sleepAverage.toFixed(2)} timmar
              </p>
            </div>
          )}
        </div>

        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Ångestnivåer
          </h2>
          <ResponsiveContainer width="100%" height={300}>
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
                  const Icon = ICONS[index % ICONS.length];
                  const isLeftSide = x < cx;

                  return (
                    <g>
                      <Icon
                        x={isLeftSide ? x - 12 : x - 9}
                        y={y - 15}
                        style={{
                          color: COLORS[index % COLORS.length],
                          fontSize: '24px',
                        }}
                      />
                      <text
                        x={isLeftSide ? x - 20 : x + 25}
                        y={y - 3}
                        fill={COLORS[index % COLORS.length]}
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
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Inställningar
          </h2>
          <p className="text-primary-medium">
            Notifikationer:{' '}
            {userData?.settings?.notifications_enabled
              ? 'Aktiverade'
              : 'Inaktiverade'}
          </p>
          <p className="text-primary-medium">
            Språk: {userData?.settings?.preferred_language}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyPage;
