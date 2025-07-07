'use client';

import EnglishPodcasts from '@/app/data/json/english-podcasts.json';
import SwedishPodcasts from '@/app/data/json/swedish-podcasts.json';
import { IPodcastResult } from '@/app/types/api/podcast';
import { useState } from 'react';
import PodcastContainer from './PodcastContainer';

const PodcastPage = () => {
  const [currentTab, setCurrentTab] = useState<'sv' | 'en'>('sv');
  const englishPodcasts: IPodcastResult = EnglishPodcasts;
  const swedishPodcasts: IPodcastResult = SwedishPodcasts;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Podcasts</h2>
          <p className="text-lg">
            Här är några utvalda podcasts där bipolaritet är i fokus
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-semibold">Svenska podcasts</h3>
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
    </section>
  );
};

export default PodcastPage;
