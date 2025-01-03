import { IMovieOrSeriesResponseData } from '@/app/types/api/movieTypes';
import Image from 'next/image';
import imdbLogo from '../../../assets/icons/imdb.svg';
import { getFormattedTimeFromSeconds } from '@/app/utils/dateUtils';

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
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full max-w-[400px] lg:max-w-[300px] h-auto overflow-hidden">
        <Image
          src={primaryImage ? primaryImage.url : 'saknar bild'}
          alt={titleText ? titleText.text : 'en film'}
          width={primaryImage?.width}
          height={primaryImage?.height}
          className="object-cover w-full rounded-md"
        />
      </div>
      <div className="flex flex-col justify-end gap-4 max-w-[400px]">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="h-sm text-green-dark">{titleText?.text}</h2>
            <p className="text-xl">({releaseDate?.year})</p>
          </div>
          <div className="flex items-center gap-2">
            <p>{formattedRuntime}</p>
            <div className="flex items-center">
              <Image src={imdbLogo} width={48} height={48} alt="imdb loggan" />
              <p>{ratingsSummary?.aggregateRating}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {movieGenres.map((genre) => {
              return (
                <div
                  className="bg-primary-light rounded-md px-2 py-1 text-black "
                  key={genre.id}
                >
                  {genre.text}
                </div>
              );
            })}
          </div>
          <p className="text-lg">{plot?.plotText?.plainText}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieContainer;
