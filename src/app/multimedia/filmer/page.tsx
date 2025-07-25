'use client';

import ActorQuote from '@/app/components/pages/multimedia/movies/ActorQuote';
import MovieContainer from '@/app/components/pages/resources/MovieContainer';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedLinks from '@/app/components/shared/RelatedLinks';
import moviesData from '@/app/data/json/movies.json';
import { ACTORS } from '@/app/data/multimedia/movies';
import { MOVIES_INTRO } from '@/app/data/pageIntros';
import { MULTIMEDIA_RELATED_LINKS } from '@/app/data/related/relatedContentLinks';
import { IMovieOrSeriesResponseData } from '@/app/types/api/movieTypes';

const MoviesPage = () => {
  const movies: IMovieOrSeriesResponseData[] = moviesData.movies;

  return (
    <section className="page-section">
      <PageIntroContainer intro={MOVIES_INTRO} />
      <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
        {ACTORS.map((actor) => {
          return <ActorQuote key={actor.id} actorInfo={actor} />;
        })}
      </div>

      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-primary-dark mb-4">
          Utvalda filmer
        </h3>
        <div className="h-1 w-20 bg-primary-dark mb-8"></div>
      </div>

      <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 list-none">
        {movies.map((movie) => (
          <MovieContainer key={movie.id} movie={movie} />
        ))}
      </nav>
      <RelatedLinks linksInfo={MULTIMEDIA_RELATED_LINKS} currentPage="filmer" />
    </section>
  );
};

export default MoviesPage;
