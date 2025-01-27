'use client';

import SpotifySection from '@/app/components/pages/resources/music/SpotifySection';
import MultimediaRelatedContent from '@/app/components/shared/MultimediaRelatedContent';
import Spinner from '@/app/components/shared/Spinner';
import { MUSIC_TABS } from '@/app/data/musicTabs';
import {
  PLAYLIST_BIPOLAR,
  PLAYLIST_CALM,
  PLAYLIST_ENERGY,
  PLAYLIST_MEDITATION,
  PLAYLIST_SLEEP,
} from '@/app/data/playlists';
import Image from 'next/image';
import { Suspense, useState } from 'react';

const MusicPage = () => {
  const [activeTab, setActiveTab] = useState('energi');
  const [activePlaylist, setActivePlaylist] = useState(PLAYLIST_ENERGY);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'bipolär') {
      setActivePlaylist(PLAYLIST_BIPOLAR);
    } else if (tab === 'sömn') {
      setActivePlaylist(PLAYLIST_SLEEP);
    } else if (tab === 'meditation') {
      setActivePlaylist(PLAYLIST_MEDITATION);
    } else if (tab === 'energi') {
      setActivePlaylist(PLAYLIST_ENERGY);
    } else if (tab === 'lugn') {
      setActivePlaylist(PLAYLIST_CALM);
    }
  };

  return (
    <section className="w-full space-y-12 max-w-[1440px] px-4 md:px-10 pt-10 pb-20 ">
      <div className="w-full bg-tertiary-light text-tertiary-dark flex items-center shadow-sm rounded-lg justify-end px-10 py-10 gap-10">
        <div className="flex-1">
          <h2 className="h-lg font-bold mb-6">Spellistor</h2>
          <p className="text-xl text-tertiary-dark">
            Här finns det samlat spellistor som kan hjälpa dig som är
            diagnostiserad med bipolär sjukdom. Vare sig du är i remission eller
            i en deppig fas, så kan du hitta spellistor som kan hjälpa dig. Här
            finns spellistor som kan hjälpa dig att sova, meditera och mer.
          </p>
        </div>
        <div className="flex-1 rounded-lg overflow-hidden w-full">
          <Image
            src="/images/music.jpg"
            alt="kvinna som lyssnar på musik"
            aria-label="kvinna som lyssnar på musik"
            width={1200}
            height={800}
            quality={80}
            className="object-cover rounded-sm lg:rounded-full"
            priority
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        {MUSIC_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              quartiary-button
              ${activeTab === tab.id ? 'active' : ''}
            `}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <Suspense fallback={<Spinner />}>
        <SpotifySection activePlaylist={activePlaylist} />
      </Suspense>
      <MultimediaRelatedContent currentPage="musik" />
    </section>
  );
};

export default MusicPage;
