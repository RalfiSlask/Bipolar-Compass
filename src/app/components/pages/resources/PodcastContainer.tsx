import { IPodcast } from '@/app/types/podcast';
import { formatDurationToMinutesAndSeconds } from '@/app/utils/dateUtils';
import { stripHtml } from '@/app/utils/securityUtils';
import { formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';
import Image from 'next/image';

const PodcastContainer = ({ podcastData }: { podcastData: IPodcast }) => {
  const {
    id,
    image,
    podcast,
    title_original,
    description_original,
    pub_date_ms,
    audio_length_sec,
    link,
  } = podcastData;

  return (
    <article
      key={id}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
    >
      <div className="relative aspect-square w-full max-w-[300px] mx-auto">
        <Image
          src={image}
          alt={`${title_original} omslagsbild`}
          fill
          className="object-cover transition-transform duration-300 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <header className="flex flex-col gap-2">
          <h4 className="text-xl font-semibold">{podcast.title_original}</h4>
          <p className="text-sm text-gray-600">{podcast.publisher_original}</p>
        </header>

        <p className="text-gray-700 line-clamp-3">
          {stripHtml(description_original)}
        </p>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>
            {formatDistanceToNow(new Date(pub_date_ms), {
              addSuffix: true,
              locale: sv,
            })}
          </span>
          <span>•</span>
          <span>{formatDurationToMinutesAndSeconds(audio_length_sec)}</span>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block primary-button mt-auto"
          aria-label={`Lyssna på ${title_original}`}
        >
          Lyssna
        </a>
      </div>
    </article>
  );
};

export default PodcastContainer;
