'use client';

import HealthcareProvidersSettings from '@/app/components/dashboard/settings/healtcare_providers/HealthcareProvidersSettings';
import Spinner from '@/app/components/shared/Spinner';
import { IHealthcareProvider } from '@/app/types/healthcareProvider';
import { IUser } from '@/app/types/user';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const HealthcareProviderPageContent = () => {
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

  const saveHealthcareProvidersSettings = async (
    healthcare_providers: IHealthcareProvider[],
    operation: 'add' | 'edit' | 'delete'
  ) => {
    if (!email) return;

    try {
      await axios.put('/api/settings/save/healthcare-providers', {
        healthcare_providers,
        email,
      });

      if (user) {
        setUser({
          ...user,
          settings: {
            ...user.settings,
            healthcare_providers,
          },
        });
      }

      // Show appropriate toast message based on the operation
      if (operation === 'add') {
        toast.success('Vårdgivare sparad!');
      } else if (operation === 'edit') {
        toast.success('Vårdgivare uppdaterad!');
      } else if (operation === 'delete') {
        toast.success('Vårdgivare borttagen!');
      }
    } catch (err) {
      toast.error('Något gick fel när vårdgivare sparades.');
      console.error('could not save healthcare providers: ', err);
      throw new Error('Could not save healthcare providers');
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
      <HealthcareProvidersSettings
        user={user}
        saveHealthcareProvidersSettings={saveHealthcareProvidersSettings}
      />
    </div>
  );
};

export default function HealthcareProviderPage() {
  return <HealthcareProviderPageContent />;
}
