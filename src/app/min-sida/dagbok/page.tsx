'use client';

import Spinner from '@/app/components/shared/Spinner';
import { ICustomSession } from '@/app/types/authoptions';
import { IDiaryEntry, IUserDiary } from '@/app/types/diary';
import { getMoodEmoji, removeEntryElements } from '@/app/utils/diaryUtils';
import { DayCellMountArg } from '@fullcalendar/core/index.js';
import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dateToDelete, setDateToDelete] = useState<string>('');
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

  const openDeleteModal = (date: string) => {
    setDateToDelete(date);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const dayCellDidMount = (arg: DayCellMountArg) => {
    const date = arg.date.toISOString().split('T')[0];
    const entry = diaryEntries[date];
    const cell = arg.el;

    const innerFrame = cell?.querySelector('.fc-daygrid-day-frame');
    if (!innerFrame) return;

    const dayTop = cell?.querySelector('.fc-daygrid-day-top');
    if (dayTop) dayTop.id = `${date}-top`;
    const existingContent = innerFrame.querySelector(`.diary-entry-preview`);
    if (existingContent) existingContent.id = `${date}-content`;
    const existingButton = innerFrame.querySelector('.diary-add-btn');
    if (existingButton) existingButton.id = `${date}-button`;
    const existingDeleteButton = innerFrame.querySelector('.diary-delete-btn');
    if (existingDeleteButton) existingDeleteButton.id = `${date}-delete-button`;
    if (existingContent) existingContent.remove();
    if (existingButton) existingButton.remove();
    if (existingDeleteButton) existingDeleteButton.remove();

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'diary-buttons-container';

    if (entry && Object.keys(entry).length > 0) {
      const deleteButton = document.createElement('button');
      deleteButton.className = 'diary-delete-btn';
      deleteButton.id = `${date}-delete-button`;
      deleteButton.innerHTML =
        '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>';

      deleteButton.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        openDeleteModal(date);
      };

      buttonsContainer.appendChild(deleteButton);
    }

    const button = document.createElement('button');
    button.className = 'diary-add-btn';
    button.id = `${date}-button`;
    button.innerHTML =
      entry && Object.keys(entry).length > 0
        ? '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"></path></svg>'
        : '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0-13.3-10.7 24-24 24s-24-10.7-24-24z"></path></svg>';

    button.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      router.push(`/min-sida/dagbok/${date}`);
    };

    buttonsContainer.appendChild(button);
    innerFrame.appendChild(buttonsContainer);

    if (entry && Object.keys(entry).length > 0) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'diary-entry-preview';
      contentDiv.id = `${date}-content`;

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
      titleSpan.id = `${date}-title`;
      contentDiv.appendChild(titleSpan);

      const descriptionSpan = document.createElement('span');
      descriptionSpan.className = 'diary-description';
      descriptionSpan.textContent = entry.notes;
      descriptionSpan.id = `${date}-description`;
      dayTop?.appendChild(contentDiv);
      dayTop?.classList.add('have-entry');
      innerFrame.appendChild(descriptionSpan);
    }
  };

  const deleteDiaryEntry = async (id: string, date: string) => {
    try {
      if (!session?.user?.id) return;

      const bodyToSend = {
        entry_id: id,
        user_id: session?.user?.id,
      };

      const response = await axios.post('/api/diary/delete', bodyToSend);

      if (response.data) {
        const newEntries = { ...diaryEntries };
        delete newEntries[date];
        updateDiaryEntries(newEntries);
        removeEntryElements(date);
        toast.success('Dagboksinlägg borttaget');
      } else {
        toast.error('Något gick fel vid borttagning av dagboksinlägg');
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Kunde inte ta bort dagboksinlägg');
      router.refresh();
    }
  };

  const updateDiaryEntries = (entries: { [key: string]: IDiaryEntry }) => {
    setDiaryEntries(entries);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="flex w-full justify-center px-10 h-full py-20 relative">
      {isDeleteModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 w-full h-full"></div>
          <div className="flex flex-col text-lg justify-center items-center gap-6 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-white p-8 rounded-lg shadow-lg">
            <div className="flex flex-col text-center">
              <h2 className="h-sm font-semibold">
                Är du säker på att du vill ta bort detta dagboksinlägg?
              </h2>
              <p className="text-gray-600 text-sm">
                Detta är en permanent åtgärd och kan inte ångras.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const entry = diaryEntries[dateToDelete];
                  if (entry?.id) {
                    deleteDiaryEntry(entry.id, dateToDelete);
                  }
                  closeDeleteModal();
                }}
                className="primary-button"
              >
                Ja
              </button>
              <button onClick={closeDeleteModal} className="tertiary-button">
                Nej
              </button>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col w-full max-w-[1440px] h-full px-4 md:px-10">
        <h2 className="h-md font-bold text-primary-dark">Dagbok</h2>
        <Calendar dayCellDidMount={dayCellDidMount} />
      </div>
    </section>
  );
};

export default DiaryPage;
