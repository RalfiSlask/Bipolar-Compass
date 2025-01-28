'use client';

import Spinner from '@/app/components/shared/Spinner';
import { ICustomSession } from '@/app/types/authoptions';
import { IDiaryEntry, IUserDiary } from '@/app/types/diary';
import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

// We use dynamic import to prevent the calendar from being loaded on the server.
const Calendar = dynamic(
  () => import('@/app/components/dashboard/diary/Calender'),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

const DiaryPage = () => {
  const [diaryEntries, setDiaryEntries] = useState<{
    [key: string]: IDiaryEntry;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession() as { data: ICustomSession | null };

  const router = useRouter();

  useEffect(() => {
    const fetchUserDiary = async () => {
      if (!session?.user?.id) return;
      setIsLoading(true);
      try {
        const response: AxiosResponse<IUserDiary> = await axios.post(
          '/api/diary/get',
          {
            user_id: session.user.id,
          }
        );

        if (response.data?.entries) {
          setDiaryEntries(response.data.entries);
        }
      } catch (err) {
        console.error(err);
        toast.error('Kunde inte hämta dagboksanteckningar');
      }
      setIsLoading(false);
    };

    fetchUserDiary();
  }, [session]);

  const handleEntryClick = (date: string) => {
    router.push(`/min-sida/dagbok/${date}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative flex w-full justify-center px-2 md:px-10 min-h-screen py-10">
      <Image
        src="/images/dashboard/diary.jpg"
        alt="Bakgrundsbild"
        fill
        priority
        className="object-cover z-0 opacity-60"
        quality={80}
      />
      <div className="relative z-10 flex flex-col w-full max-w-[1440px] h-full px-1 md:px-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-0 py-6 md:p-8">
          <div className="flex flex-col items-center md:items-start gap-2 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">
              Min Dagbok
            </h2>
            <p className="text-primary-dark text-sm">
              Här kan du skriva ner dina tankar och minnen.
            </p>
          </div>
          <Calendar entries={diaryEntries} onEntryClick={handleEntryClick} />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
