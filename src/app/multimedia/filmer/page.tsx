'use client';

import MovieContainer from '@/app/components/pages/resources/MovieContainer';
import moviesData from '@/app/data/movies.json';
import { IMovieOrSeriesResponseData } from '@/app/types/api/movieTypes';

const MoviesPage = () => {
  const movies: IMovieOrSeriesResponseData[] = moviesData.movies;

  return (
    <section className="w-full flex flex-col gap-10">
      <div className="w-full flex flex-col gap-4">
        <h2 className="h-lg text-primary-dark">Filmer</h2>
        <div className="bg-primary-light flex">
          <div className="w-[10px] bg-primary-dark"></div>
          <p className="text-lg max-w-[1200px] p-4 ">
            Filmer kan ge oss en unik inblick i hur det är att leva med
            bipolaritet och genom att följa dessa berättelser kan vi både känna
            igen oss själva och få större empati för andra.
          </p>
        </div>
      </div>
      <div>
        <p>
          &quotVi ville visa att dessa karaktärer ej är deras diagnoser. Att de
          är komplexa, bristfälliga och vackra människor.&quot
        </p>
        <p>
          - Jennifer Lawrence för sin oscarbelönade roll som Tiffany i Silver
          Linings playbook
        </p>
      </div>
      <div className="flex flex-col gap-10">
        {movies.map((movie) => {
          return <MovieContainer key={movie.id} movie={movie} />;
        })}
      </div>
    </section>
  );
};

export default MoviesPage;
