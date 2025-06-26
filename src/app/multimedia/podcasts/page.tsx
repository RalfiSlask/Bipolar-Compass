'use client';

import PodcastContainer from '@/app/components/pages/resources/PodcastContainer';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedLinks from '@/app/components/shared/RelatedLinks';
import Spinner from '@/app/components/shared/Spinner';
import EnglishPodcasts from '@/app/data/json/english-podcasts.json';
import SwedishPodcasts from '@/app/data/json/swedish-podcasts.json';
import { PODCASTS_INTRO } from '@/app/data/pageIntros';
import { MULTIMEDIA_RELATED_LINKS } from '@/app/data/related/relatedContentLinks';
import { IPodcastResult } from '@/app/types/api/podcast';
import { useEffect, useState } from 'react';

const PodcastPage = () => {
  const [currentTab, setCurrentTab] = useState<'sv' | 'en'>('sv');
  const englishPodcasts: IPodcastResult = EnglishPodcasts;
  const [mounted, setMounted] = useState(false);
  const swedishPodcasts: IPodcastResult = SwedishPodcasts;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Spinner />;

  return (
    <section className="page-section">
      <div className="flex flex-col page-gaps">
        <PageIntroContainer intro={PODCASTS_INTRO} />

        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-semibold text-primary-dark">
            {currentTab === 'sv' ? 'Svenska' : 'Engelska'} podcasts
          </h3>
          <div className="flex gap-2">
            <button
              className={`${
                currentTab === 'sv' ? 'primary-button' : 'secondary-button'
              } px-4 py-2 rounded-md`}
              onClick={() => setCurrentTab('sv')}
            >
              Svenska
            </button>
            <button
              className={`${
                currentTab === 'en' ? 'primary-button' : 'secondary-button'
              } px-4 py-2 rounded-md`}
              onClick={() => setCurrentTab('en')}
            >
              Engelska
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTab === 'sv'
              ? swedishPodcasts.results.map((podcast) => (
                  <PodcastContainer key={podcast.id} podcastData={podcast} />
                ))
              : englishPodcasts.results.map((podcast) => (
                  <PodcastContainer key={podcast.id} podcastData={podcast} />
                ))}
          </div>
        </div>
      </div>
      <RelatedLinks
        linksInfo={MULTIMEDIA_RELATED_LINKS}
        currentPage="podcasts"
      />
    </section>
  );
};

export default PodcastPage;
