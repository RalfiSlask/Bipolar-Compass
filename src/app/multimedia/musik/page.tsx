'use client';

import SpotifySection from '@/app/components/pages/resources/music/SpotifySection';
import Spinner from '@/app/components/shared/Spinner';
import { MUSIC_TABS } from '@/app/data/multimedia/musicTabs';
import {
  PLAYLIST_BIPOLAR,
  PLAYLIST_CALM,
  PLAYLIST_ENERGY,
  PLAYLIST_MEDITATION,
  PLAYLIST_SLEEP,
} from '@/app/data/multimedia/playlists';

import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedLinks from '@/app/components/shared/RelatedLinks';
import { MUSIC_INTRO } from '@/app/data/pageIntros';
import { MULTIMEDIA_RELATED_LINKS } from '@/app/data/related/relatedContentLinks';
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
    <section className="page-section ">
      <PageIntroContainer intro={MUSIC_INTRO} />
      <div className="flex flex-wrap gap-4 items-center mb-4 sm:mb-10">
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
      <RelatedLinks linksInfo={MULTIMEDIA_RELATED_LINKS} currentPage="musik" />
    </section>
  );
};

export default MusicPage;
