'use client';

import DashboardSidebar from '@/app/components/dashboard/DashboardSidebar';
import DashboardSettingsNavigation from '@/app/components/dashboard/settings/DashboardSettingsNavigation';
import MedicineSettings from '@/app/components/dashboard/settings/medication/MedicineSettings';
import NotificationsSettings from '@/app/components/dashboard/settings/notifications/NotificationsSettings';
import ProfileSettings from '@/app/components/dashboard/settings/profile/ProfileSettings';
import RelativesSettings from '@/app/components/dashboard/settings/relatives/RelativesSettings';
import SecuritySettings from '@/app/components/dashboard/settings/security/SecuritySettings';
import VerficationMessage from '@/app/components/shared/VerficationMessage';
import { SettingsProvider } from '@/app/context/SettingsContext';
import useSettingsContext from '@/app/hooks/useSettingsContext';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const SettingsPageContent = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const context = useSettingsContext();
  const { fetchUserData } = context;
  const email = session?.user?.email;
  const isUserVerified = session?.user?.isVerified;

  useEffect(() => {
    if (email) {
      console.log('Fetching user data for email:', email);
      fetchUserData(email);
    }
  }, [email, fetchUserData]);

  const changeActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section className="flex flex-col h-screen md:pl-[200px] lg:pl-[300px] w-full">
      <DashboardSidebar email={email || ''} />
      <DashboardSettingsNavigation
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
      />
      <div className="h-full pt-10">
        <div className="flex flex-col gap-10">
          <div>
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'relatives' && <RelativesSettings />}
            {activeTab === 'notifications' && <NotificationsSettings />}
            {activeTab === 'medicines' && <MedicineSettings />}
          </div>
          {isUserVerified && <VerficationMessage />}
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
