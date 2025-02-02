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

import { Suspense, useState } from 'react';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import { musicIntro } from '@/app/data/pageIntros';

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
      <PageIntroContainer intro={musicIntro} />

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
