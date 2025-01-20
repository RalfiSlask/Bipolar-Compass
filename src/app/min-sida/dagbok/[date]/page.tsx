'use client';

import Spinner from '@/app/components/shared/Spinner';
import { ICustomSession } from '@/app/types/authoptions';
import { IDiaryEntry } from '@/app/types/diary';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5';

const DiaryNote = () => {
  const router = useRouter();
  const params = useParams();
  const date = params.date as string;
  const { data: session } = useSession() as { data: ICustomSession | null };
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<IDiaryEntry>>({
    title: '',
    notes: '',
    mood: undefined,
  });

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="flex flex-col h-screen  items-center justify-center w-full">
      <Link
        href="/min-sida/dagbok"
        className="inline-flex items-center text-primary-dark hover:text-primary mb-4 transition-all duration-200 hover:translate-x-[-10px]"
      >
        <IoArrowBack className="mr-1" />
        <span>Tillbaka till dagboken</span>
      </Link>

      <div className="max-w-2xl w-full mx-auto p-6 bg-primary-light rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-dark mb-2">
            Dagboksanteckning{' '}
            {new Date(date as string).toLocaleDateString('sv-SE')}
          </h2>
          <div className="h-px bg-primary-border w-full"></div>
        </div>

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
          </div>
        </form>
      </div>
    </section>
  );
};

export default DiaryNote;
