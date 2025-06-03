'use client';

import DashboardSettingsNavigation from '@/app/components/dashboard/settings/DashboardSettingsNavigation';
import ProfileSettings from '@/app/components/dashboard/settings/profile/ProfileSettings';
import SecuritySettings from '@/app/components/dashboard/settings/security/SecuritySettings';
import Spinner from '@/app/components/shared/Spinner';
import { SettingsProvider } from '@/app/context/SettingsContext';
import useSettingsContext from '@/app/hooks/useSettingsContext';
import { ICustomSession } from '@/app/types/authoptions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const SettingsPageContent = () => {
  const { data: session } = useSession() as { data: ICustomSession | null };
  const [activeTab, setActiveTab] = useState('profile');
  const context = useSettingsContext();
  const { fetchUserData } = context;
  const email = session?.user?.email;

  useEffect(() => {
    if (email) {
      fetchUserData(email);
    }
  }, [email, fetchUserData]);

  const changeActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  if (!session?.user?.email) {
    return <Spinner />;
  }

  return (
    <section className="flex flex-col h-full w-full">
      <DashboardSettingsNavigation
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
      />
      <div className="h-full pt-4 sm:pt-10">
        <div className="flex flex-col gap-10">
          <div className="flex justify-center">
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'security' && <SecuritySettings />}
          </div>
        </div>
      </div>
    </section>
  );
};

const SettingsPage = () => {
  return (
    <SettingsProvider>
      <SettingsPageContent />
    </SettingsProvider>
  );
};

export default SettingsPage;
