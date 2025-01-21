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
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Spinner from '../components/shared/Spinner';
import { ICustomSession } from '../types/authoptions';
import { IMoodTrackerWeek } from '../types/moodtracker';
import { IUser } from '../types/user';

const MyPage = () => {
  const { data: session } = useSession() as { data: ICustomSession | null };
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [moodTrackerData, setMoodTrackerData] = useState<IMoodTrackerWeek[]>(
    []
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!session?.user?.email) return;

        const response: AxiosResponse<IUser> = await axios.post('/api/user', {
          email: session.user.email,
        });

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

    const fetchMoodTrackerData = async () => {
      try {
        if (!session?.user?.id) return;

        const response = await axios.post('/api/history', {
          user_id: session.user.id,
        });

        if (response.data) {
          setMoodTrackerData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch mood tracker data:', error);
      }
    };

    fetchUserData();
    fetchMoodTrackerData();
  }, [session]);

  const calculateSleepAverage = () => {
    const sleepMood = moodTrackerData
      .flatMap((week) => week.mood_values)
      .find((mood) => mood.id === 'sleep');
    if (!sleepMood) return null;

    const validDays = sleepMood.valueForDays.filter(
      (day) => day.value !== null && day.value >= 0
    );

    if (validDays.length < 7) return null;

    const totalSleep = validDays.reduce(
      (sum, day) => sum + (day.value || 0),
      0
    );
    return totalSleep / validDays.length;
  };

  const sleepAverage = calculateSleepAverage();

  const sleepData =
    moodTrackerData
      .flatMap((week) => week.mood_values)
      .find((mood) => mood.id === 'sleep')
      ?.valueForDays.filter((day) => day.value !== null && day.value >= 0)
      .map((day) => ({
        date: new Date(day.date).toLocaleDateString('sv-SE', {
          month: 'short',
          day: 'numeric',
        }),
        value: day.value,
      })) || [];

  const anxietyMood = moodTrackerData
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
            Medicinering
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
            Sömn (h)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sleepData}>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
              <XAxis dataKey="date">
                <Label value="Datum" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label value="Timmar" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f5f5f5',
                  borderColor: '#ccc',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
          {sleepAverage !== null && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800">
                <span className="font-semibold">Genomsnittlig sömn: </span>
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
