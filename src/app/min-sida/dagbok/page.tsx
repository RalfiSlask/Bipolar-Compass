'use client';

import Spinner from '@/app/components/shared/Spinner';
import { ICustomSession } from '@/app/types/authoptions';
import { IDiaryEntry, IUserDiary } from '@/app/types/diary';
import { getMoodEmoji } from '@/app/utils/diaryUtils';
import { DayCellMountArg } from '@fullcalendar/core/index.js';
import svLocale from '@fullcalendar/core/locales/sv';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const FullCalendar = dynamic(() => import('@fullcalendar/react'), {
  ssr: false,
  loading: () => <Spinner />,
});

const DiaryPage = () => {
  const [diaryEntries, setDiaryEntries] = useState<{
    [key: string]: IDiaryEntry;
  }>({});
  const router = useRouter();
  const { data: session } = useSession() as { data: ICustomSession | null };

  useEffect(() => {
    const fetchUserDiary = async () => {
      if (!session?.user?.id) return;
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
    };

    fetchUserDiary();
  }, [session]);

  const dayCellDidMount = (arg: DayCellMountArg) => {
    const date = arg.date.toISOString().split('T')[0];
    const entry = diaryEntries[date];
    const cell = arg.el;
    const innerFrame = cell.querySelector('.fc-daygrid-day-frame');

    const button = document.createElement('button');
    button.innerHTML = '+';
    button.className = 'diary-add-btn';
    button.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      router.push(`/min-sida/dagbok/${date}`);
    };

    if (entry) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'diary-entry-preview';

      const moodEmoji = getMoodEmoji(entry.mood);
      if (moodEmoji) {
        const moodSpan = document.createElement('span');
        moodSpan.className = 'diary-mood';
        moodSpan.innerHTML = moodEmoji;
        contentDiv.appendChild(moodSpan);
      }

      const titleSpan = document.createElement('span');
      titleSpan.className = 'diary-title';
      titleSpan.textContent = entry.title;
      contentDiv.appendChild(titleSpan);

      if (innerFrame) {
        innerFrame.appendChild(contentDiv);
      }
    }

    if (innerFrame) {
      innerFrame.appendChild(button);
    }
  };

  return (
    <section className="flex flex-col w-[800px]">
      <h2 className="h-md font-bold text-primary-dark">Dagbok</h2>

      <div className="h-full w-full p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={svLocale}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek',
          }}
          buttonText={{
            today: 'Idag',
            month: 'Månad',
            week: 'Vecka',
          }}
          selectable={false}
          dayMaxEvents={true}
          weekends={true}
          dayCellDidMount={dayCellDidMount}
          height={800}
        />
      </div>
    </section>
  );
};

export default DiaryPage;
