import { IMovieOrSeriesResponseData } from '@/app/types/api/movieTypes';
import { getFormattedTimeFromSeconds } from '@/app/utils/dateUtils';
import Image from 'next/image';
import imdbLogo from '../../../assets/icons/imdb.svg';

interface IMovieContainerProps {
  movie: IMovieOrSeriesResponseData;
}

const MovieContainer = ({ movie }: IMovieContainerProps) => {
  const {
    titleText,
    ratingsSummary,
    plot,
    primaryImage,
    releaseDate,
    runtime,
  } = movie;
  const movieGenres = movie.genres?.genres ?? [];
  const runtimeInSeconds = runtime?.seconds || 0;
  const formattedRuntime = getFormattedTimeFromSeconds(runtimeInSeconds);

  return (
    <a
      href={movie.imdbLink}
      target="_blank"
      className="block transform transition-transform group hover:shadow-lg duration-200"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={primaryImage ? primaryImage.url : 'saknar bild'}
            alt={titleText ? titleText.text : 'en film'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h2 className="h-sm text-green-dark">{titleText?.text}</h2>
              <p className="text-xl">({releaseDate?.year})</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-gray-600">{formattedRuntime}</p>
              <div className="flex items-center gap-1">
                <Image
                  src={imdbLogo}
                  width={40}
                  height={40}
                  alt="imdb loggan"
                />
                <p className="font-medium">{ratingsSummary?.aggregateRating}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {movieGenres.map((genre) => (
                <div
                  className="bg-primary-light rounded-md px-3 py-1 text-sm"
                  key={genre.id}
                >
                  {genre.text}
                </div>
              ))}
            </div>
            <p className="text-gray-700 line-clamp-3">
              {plot?.plotText?.plainText}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default MovieContainer;
