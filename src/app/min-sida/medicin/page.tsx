'use client';

import MedicineSettings from '@/app/components/dashboard/settings/medication/MedicineSettings';
import Spinner from '@/app/components/shared/Spinner';
import { IMedication } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const MedicinePageContent = () => {
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

  const saveMedicationSettings = async (medications: IMedication[]) => {
    if (!email) return;

    try {
      await axios.put('/api/settings/save/medications', {
        medications,
        email,
      });

      if (user) {
        setUser({
          ...user,
          profile: {
            ...user.profile,
            medications,
          },
        });
      }
    } catch (err) {
      console.error('could not save medications: ', err);
      throw new Error('Could not save medications');
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
    <section className="w-full px-6 py-12 min-h-screen bg-tertiary-light flex justify-center">
      <MedicineSettings
        user={user}
        saveMedicationSettings={saveMedicationSettings}
      />
    </section>
  );
};

export default function MedicinePage() {
  return <MedicinePageContent />;
}
