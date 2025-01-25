'use client';

import Spinner from '@/app/components/shared/Spinner';
import { ICustomSession } from '@/app/types/authoptions';
import { IDiaryEntry } from '@/app/types/diary';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IoArrowBack, IoTrashOutline } from 'react-icons/io5';

const DiaryNote = () => {
  const router = useRouter();
  const params = useParams();
  const date = params.date as string;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: session } = useSession() as { data: ICustomSession | null };
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<IDiaryEntry>>({
    title: '',
    notes: '',
    mood: undefined,
    id: '',
  });

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchDiaryNote = async () => {
      setIsLoading(true);
      if (!session?.user?.id) return;

      try {
        const response = await axios.post(`/api/diary/${date}`, {
          user_id: session.user.id,
        });

        if (response.data) {
          setFormData({
            title: response.data.title || '',
            notes: response.data.notes || '',
            mood: response.data.mood,
            id: response.data.id || '',
          });
        }
      } catch (error) {
        console.error(error);
        toast.error('Kunde inte hämta dagboksanteckningen');
      }
      setIsLoading(false);
    };

    fetchDiaryNote();
  }, [date, session]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast.error('Du måste vara inloggad för att spara');
      return;
    }

    setIsSaving(true);
    try {
      await axios.post('/api/diary/save', {
        user_id: session.user.id,
        date: date,
        entry: {
          ...formData,
          date: date as string,
          updated_at: new Date().toISOString(),
        },
      });

      toast.success('Dagboksanteckningen sparades');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Kunde inte spara dagboksanteckningen');
    }
    setIsSaving(false);
  };

  const dateObj = new Date(date + 'T00:00:00');

  const year = dateObj.getFullYear();
  const month = dateObj
    .toLocaleString('sv-SE', { month: 'short' })
    .replace('.', '');
  const day = dateObj.getDate().toString().padStart(2, '0');

  const deleteDiaryEntry = async () => {
    try {
      if (!session?.user?.id || !formData.id) return;

      const bodyToSend = {
        entry_id: formData.id,
        user_id: session.user.id,
      };

      const response = await axios.post('/api/diary/delete', bodyToSend);

      if (response.data) {
        toast.success('Dagboksinlägg borttaget');
        router.push('/min-sida/dagbok');
      } else {
        toast.error('Något gick fel vid borttagning av dagboksinlägg');
      }
    } catch (error) {
      console.error(error);
      toast.error('Kunde inte ta bort dagboksinlägg');
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center px-2 md:px-10 h-full py-20 relative">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-center w-full items-center min-h-screen p-4 md:p-6">
      <Image
        src="/images/dashboard/notes.jpg"
        alt="Bakgrundsbild"
        fill
        priority
        className="object-cover z-0 opacity-60"
        quality={80}
      />
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <Link
          href="/min-sida/dagbok"
          className="inline-flex items-center shadow-xl bg-white rounded-md p-2 text-primary-dark hover:text-primary mb-4 transition-all duration-200 hover:translate-x-[-10px]"
        >
          <IoArrowBack className="mr-1" />
          <span>Tillbaka till dagboken</span>
        </Link>

        <div className="bg-primary-light rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-[230px] bg-primary-dark p-6 flex justify-center">
              <div className="flex items-center justify-center gap-4 py-4 md:py-10">
                <div className="bg-secondary-light w-[6px] h-full"></div>
                <div className="flex flex-col items-start justify-center h-full">
                  <h3 className="text-center text-secondary-light text-3xl">
                    {year}
                  </h3>
                  <div className="flex flex-col items-start gap-2 justify-end h-full">
                    <h3 className="text-center text-tertiary-light text-4xl uppercase">
                      {month}
                    </h3>
                    <h3 className="text-center text-secondary-light text-3xl">
                      {day}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-gray-700 mb-2">
                    Titel
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="primary-input w-full"
                    placeholder="Ange en titel för din anteckning"
                    value={formData.title}
                    onChange={handleInputChange}
                    aria-label="Anteckningens titel"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="mood" className="block text-gray-700 mb-2">
                    Dagens humör
                  </label>
                  <select
                    id="mood"
                    name="mood"
                    className="primary-input w-full"
                    value={formData.mood || ''}
                    onChange={handleInputChange}
                    aria-label="Välj ditt humör"
                  >
                    <option value="">Välj humör</option>
                    <option value="glad">Glad 😊</option>
                    <option value="neutral">Neutral 😐</option>
                    <option value="ledsen">Ledsen 😢</option>
                    <option value="energisk">Energisk ⚡</option>
                    <option value="trött">Trött 😴</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-gray-700 mb-2">
                    Anteckning
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={6}
                    className="primary-input w-full min-h-[150px] resize-y"
                    placeholder="Skriv din dagboksanteckning här..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    aria-label="Anteckningens innehåll"
                    required
                  />
                </div>

                <div className="flex gap-4 justify-end pt-4">
                  <Link href="/min-sida/dagbok">
                    <button
                      type="button"
                      className="secondary-button"
                      aria-label="Avbryt redigering"
                      disabled={isSaving}
                    >
                      Avbryt
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="primary-button"
                    aria-label="Spara anteckning"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Sparar...' : 'Spara'}
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 hover:translate-y-[-2px] transition-all duration-200 text-2xl"
                    aria-label="ta bort anteckning"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 w-full h-full"></div>
          <div className="flex flex-col text-lg justify-center items-center gap-6 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-white p-8 rounded-lg shadow-lg">
            <div className="flex flex-col text-center">
              <h2 className="h-sm font-semibold">
                Är du säker på att du vill ta bort detta dagboksinlägg?
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Detta är en permanent åtgärd och kan inte ångras.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  deleteDiaryEntry();
                  closeDeleteModal();
                }}
                className="primary-button py-1"
              >
                Ja
              </button>
              <button
                onClick={closeDeleteModal}
                className="secondary-button py-1"
              >
                Nej
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiaryNote;
