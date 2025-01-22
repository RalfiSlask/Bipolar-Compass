'use client';

import RelativesSettings from '@/app/components/dashboard/settings/relatives/RelativesSettings';
import Spinner from '@/app/components/shared/Spinner';
import { IRelative } from '@/app/types/relative';
import { IUser } from '@/app/types/user';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const RelativesPageContent = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const email = session?.user?.email;

  const fetchUserData = async (email: string) => {
    try {
      const response = await axios.post<{ user: IUser }>('/api/settings/', {
        email,
      });
      if (response && response.data) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.error('could not fetch user data: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRelativesSettings = async (relatives: IRelative[]) => {
    if (!email) return;

    try {
      await axios.put('/api/settings/save/relatives', {
        relatives,
        email,
      });

      if (user) {
        setUser({
          ...user,
          settings: {
            ...user.settings,
            relatives,
          },
        });
      }
    } catch (err) {
      console.error('could not save relatives: ', err);
      throw new Error('Could not save relatives');
    }
  };

  useEffect(() => {
    if (email) {
      fetchUserData(email);
    }
  }, [email]);

  if (isLoading || !email) {
    return <Spinner />;
  }

  if (!user) {
    return <div>Kunde inte ladda användardata</div>;
  }

  return (
    <div className="w-full px-4 md:px-6 py-12 min-h-screen bg-tertiary-light flex justify-center">
      <RelativesSettings
        user={user}
        saveRelativesSettings={saveRelativesSettings}
      />
    </div>
  );
};

export default function RelativesPage() {
  return <RelativesPageContent />;
}
