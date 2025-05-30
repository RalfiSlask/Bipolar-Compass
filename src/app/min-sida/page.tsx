'use client';

import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  FaBed,
  FaCalendarAlt,
  FaCog,
  FaFrown,
  FaNotesMedical,
  FaUserFriends,
  FaUserNurse,
} from 'react-icons/fa';
import Spinner from '../components/shared/Spinner';

import AnxietyPieChart from '../components/dashboard/AnxietyPieChart';
import DailyAverageMoodChart from '../components/dashboard/DailyAverageMoodChart';
import DashboardCardWrapper from '../components/dashboard/DashboardCardWrapper';
import LongestStreakContainer from '../components/dashboard/LongestStreakContainer';
import MoodScoreScale from '../components/dashboard/MoodScoreScale';
import SleepGraph from '../components/dashboard/SleepGraph';
import { WEIGHTS } from '../data/dashboardWeights';
import { HEALTHCARE_PROVIDER_TYPES } from '../data/healtcareProviders';
import { RELATIVE_TYPES } from '../data/relatives';
import { ICustomSession } from '../types/authoptions';
import { IMoodValue } from '../types/moodtracker';
import { IUserWithMoodTracker } from '../types/user';
import {
  convertMedicineFrequencyToSwedishString,
  moodScoreColor,
  renderMessage,
} from '../utils/dashboardUtils';
import { getLabelByValue } from '../utils/generalUtils';
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
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  /**
   * This function is used to check if there is any mood tracker data for a given mood id.
   * @param {string} id - The id of the mood to check for.
   * @returns {boolean} - True if there is any mood tracker data for the given mood id, false otherwise.
   */
  const isThereAnyMoodTrackerData = (id: string): boolean => {
    const mood = userData?.moodTrackerData
      .flatMap((week) => week.mood_values)
      .find((mood) => mood.id === id);

    return mood?.valueForDays.some((day) => day.value !== null) ?? false;
  };

  /**
   * This function is used to calculate the average sleep time for the user.
   * @returns {number | null} - The average sleep time or null if there is no sleep mood data.
   */
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

  /**
   * This function is used to transform the sleep data into a format that can be used to display in the chart.
   * @returns { { date: string; value: number }[] } - The transformed sleep data.
   */
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

  /**
   * This function is used to calculate the mood score by using the mood data and the weights.
   * @param {IMoodValue[] | undefined} moodData - The mood data to calculate the score from.
   * @param { { [key: string]: number } } weights - The weights for each mood.
   * @returns {number} - The mood score.
   */
  const calculateMoodScore = (
    moodData: IMoodValue[] | undefined,
    weights: { [key: string]: number }
  ): number => {
    let totalScore = 0;
    let totalWeight = 0;

    // Loop through each mood and calculate the score
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
    // Return the mood score or 0 if there is no weight and no valid values
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="w-full h-full bg-tertiary-light py-10 px-4 md:px-8 lg:px-10">
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

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
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
                    <span className="text-dark text-sm">
                      {medication.dosage} {medication.doseUnit}
                    </span>
                  </div>
                  <p className="text-dark text-sm mt-1">
                    {convertMedicineFrequencyToSwedishString(
                      medication.frequency
                    )}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-dark text-sm mt-1">
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
                    {relative.name}
                  </p>
                  <p className="text-dark text-sm">
                    {getLabelByValue(relative.type, RELATIVE_TYPES)}
                  </p>
                  <p className="text-primary-dark text-sm">{relative.email}</p>
                </div>
              ))
            ) : (
              <p className="text-primary-dark text-sm mt-1">
                Inga anhöriga registrerade
              </p>
            )}
          </DashboardCardWrapper>

          <DashboardCardWrapper title="Vårdgivare" icon={FaUserNurse}>
            {userData?.settings.healthcare_providers &&
            userData?.settings.healthcare_providers.length &&
            userData?.settings.healthcare_providers.length > 0 ? (
              userData?.settings.healthcare_providers.map(
                (healthcareProvider) => (
                  <div
                    key={healthcareProvider.name}
                    className="bg-primary-light rounded-xl p-4 mb-3 last:mb-0"
                  >
                    <p className="text-primary-dark font-semibold">
                      {healthcareProvider.name}
                    </p>
                    <p className="text-dark text-sm">
                      {getLabelByValue(
                        healthcareProvider.type,
                        HEALTHCARE_PROVIDER_TYPES
                      )}
                    </p>
                    <p className="text-primary-dark text-sm">
                      {healthcareProvider.email}
                    </p>
                  </div>
                )
              )
            ) : (
              <p className="text-primary-dark text-sm mt-1">
                Inga vårdgivare registrerade
              </p>
            )}
          </DashboardCardWrapper>

          <DashboardCardWrapper title="Diagnos" icon={FaCog}>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-primary-light rounded-xl p-4">
                <p className="text-primary-dark font-semibold">
                  {userData?.profile.diagnosis
                    ? userData?.profile.diagnosis
                    : 'Ingen data'}
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
              <AnxietyPieChart normalizedAnxietyData={normalizedAnxietyData} />
            ) : (
              <p className="text-dark text-sm mt-1">
                Ingen ångest data registrerad
              </p>
            )}
          </DashboardCardWrapper>
          <DashboardCardWrapper title="Sömn" icon={FaBed} className="h-full">
            {isThereAnyMoodTrackerData('sleep') ? (
              <SleepGraph sleepData={sleepData} />
            ) : (
              <p className="text-dark text-sm mt-1">
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
            <DailyAverageMoodChart moodValues={moodValues} />
          </div>
          <LongestStreakContainer moodValues={moodValues} />
        </div>
        <MoodScoreScale />
      </div>
    </section>
  );
};

export default MyPage;
