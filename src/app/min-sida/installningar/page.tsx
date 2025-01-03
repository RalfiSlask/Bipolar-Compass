'use client';

import DashboardSidebar from '@/app/components/dashboard/DashboardSidebar';
import DashboardSettingsNavigation from '@/app/components/dashboard/settings/DashboardSettingsNavigation';
import MedicineSettings from '@/app/components/dashboard/settings/medication/MedicineSettings';
import NotificationsSettings from '@/app/components/dashboard/settings/notifications/NotificationsSettings';
import ProfileSettings from '@/app/components/dashboard/settings/profile/ProfileSettings';
import RelativesSettings from '@/app/components/dashboard/settings/relatives/RelativesSettings';
import SecuritySettings from '@/app/components/dashboard/settings/security/SecuritySettings';
import Spinner from '@/app/components/shared/Spinner';
import VerficationMessage from '@/app/components/shared/VerficationMessage';
import { SettingsProvider } from '@/app/context/SettingsContext';
import { IUser } from '@/app/types/user';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface IUserResponse {
  user: IUser;
}

const SettingsPage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const { data: session } = useSession();
  const isUserVerified = session?.user?.isVerified;
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post<IUserResponse>(`/api/settings/`, {
          email,
        });
        if (response && response.data) {
          setUser(response.data.user);
        }
      } catch (err) {
        setUser(null);
        console.error('error in fetching data: ', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  const changeActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  if (!user) return <Spinner />;

  return (
    <section className="flex flex-col h-screen md:pl-[200px] lg:pl-[300px] w-full">
      <DashboardSidebar email={user?.email ? user.email : ''} />
      <DashboardSettingsNavigation
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
      />
      <SettingsProvider userData={user}>
        <div className="h-full pt-10">
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col gap-10">
              {user ? (
                <div>
                  {activeTab === 'profile' && (
                    <ProfileSettings userData={user} />
                  )}
                  {activeTab === 'security' && (
                    <SecuritySettings userData={user} />
                  )}
                  {activeTab === 'relatives' && (
                    <RelativesSettings userData={user} />
                  )}
                  {activeTab === 'notifications' && (
                    <NotificationsSettings userData={user} />
                  )}
                  {activeTab === 'medicines' && (
                    <MedicineSettings userData={user} />
                  )}
                </div>
              ) : (
                <p>Kunde inte hämta användardata.</p>
              )}
              {isUserVerified && <VerficationMessage />}
            </div>
          )}
        </div>
      </SettingsProvider>
    </section>
  );
};

export default SettingsPage;
