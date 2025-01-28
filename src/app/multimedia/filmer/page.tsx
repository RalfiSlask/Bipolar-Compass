'use client';

import ActorQuote from '@/app/components/pages/multimedia/movies/ActorQuote';
import MovieContainer from '@/app/components/pages/resources/MovieContainer';
import MultimediaRelatedContent from '@/app/components/shared/MultimediaRelatedContent';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import moviesData from '@/app/data/json/movies.json';
import { ACTORS } from '@/app/data/movies';
import { moviesIntro } from '@/app/data/pageIntros';
import { IMovieOrSeriesResponseData } from '@/app/types/api/movieTypes';

const MoviesPage = () => {
  const movies: IMovieOrSeriesResponseData[] = moviesData.movies;

  return (
    <section className="w-full space-y-12 max-w-[1440px] px-4 md:px-10 pt-10 pb-20">
      <PageIntroContainer intro={moviesIntro} />
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {ACTORS.map((actor) => {
          return <ActorQuote key={actor.id} actorInfo={actor} />;
        })}
      </div>

      <div className="mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-primary-dark mb-4">
          Utvalda filmer
        </h3>
        <div className="h-1 w-20 bg-primary-dark mb-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {movies.map((movie) => (
          <MovieContainer key={movie.id} movie={movie} />
        ))}
      </div>
      <MultimediaRelatedContent currentPage="filmer" />
    </section>
  );
};

export default MoviesPage;
