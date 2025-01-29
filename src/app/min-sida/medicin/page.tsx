'use client';

import MedicineSettings from '@/app/components/dashboard/settings/medication/MedicineSettings';
import Spinner from '@/app/components/shared/Spinner';
import { IMedication } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiAlertCircle } from 'react-icons/fi';

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
      toast.error('Kunde inte hämta användardata');
    } finally {
      setIsLoading(false);
    }
  };

  const saveMedicationSettings = async (
    medications: IMedication[]
  ): Promise<IMedication[]> => {
    if (!email) return medications;

    try {
      const response = await axios.put('/api/settings/save/medications', {
        medications,
        email,
      });

      if (response?.data?.medications) {
        setUser((prevUser) =>
          prevUser
            ? {
                ...prevUser,
                profile: {
                  ...prevUser.profile,
                  medications: response.data.medications,
                },
              }
            : prevUser
        );
        return response.data.medications;
      }
    } catch (err) {
      console.error('could not save medications: ', err);
    }

    return medications;
  };

  useEffect(() => {
    if (email) {
      fetchUserData(email);
    }
  }, [email]);

  if (isLoading || !email) {
    return (
      <div className="min-h-screen bg-tertiary-light w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full bg-tertiary-light flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <FiAlertCircle className="w-12 h-12 text-tertiary-dark mx-auto mb-4" />
          <p className="text-gray-700">Kunde inte ladda användardata</p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 py-8 sm:py-12 min-h-screen bg-tertiary-light">
      <div className="max-w-7xl mx-auto">
        <MedicineSettings
          user={user}
          saveMedicationSettings={saveMedicationSettings}
        />
      </div>
    </section>
  );
};

export default function MedicinePage() {
  return <MedicinePageContent />;
}
