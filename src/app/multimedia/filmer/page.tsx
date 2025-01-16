'use client';

import MovieContainer from '@/app/components/pages/resources/MovieContainer';
import moviesData from '@/app/data/movies.json';
import { IMovieOrSeriesResponseData } from '@/app/types/api/movieTypes';
import Image from 'next/image';

const MoviesPage = () => {
  const movies: IMovieOrSeriesResponseData[] = moviesData.movies;

  return (
    <section className="container mx-auto px-4 md:px-10 py-8 md:py-12 max-w-[1440px] w-full">
      <div className="mb-12">
        <h2 className="h-lg text-primary-dark mb-6">Filmer</h2>
        <div className="bg-primary-light flex">
          <div className="w-1 bg-primary-dark"></div>
          <p className="text-base md:text-lg p-4 md:p-6">
            Filmer kan ge oss en unik inblick i hur det är att leva med
            bipolaritet och genom att följa dessa berättelser kan vi både känna
            igen oss själva och få större empati för andra.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-center bg-gray-50 rounded-lg overflow-hidden">
          <div className="md:w-[250px] flex-shrink-0">
            <Image
              src="/images/movies/jennifer-lawrence.webp"
              alt="Jennifer Lawrence"
              width={250}
              height={141}
              className="object-cover w-full aspect-[1920/1080]"
            />
          </div>
          <div className="flex flex-col gap-4 p-6 flex-grow">
            <p className="text-lg italic leading-relaxed">
              &quot;Vi ville visa att dessa karaktärer ej är deras diagnoser.
              Att de är komplexa, bristfälliga och vackra människor.&quot;
            </p>
            <p className="text-sm text-gray-600">
              - Jennifer Lawrence för sin oscarbelönade roll som Tiffany i
              Silver Linings Playbook
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center bg-gray-50 rounded-lg overflow-hidden">
          <div className="md:w-[250px] flex-shrink-0">
            <Image
              src="/images/movies/stephen-fry.webp"
              alt="Stephen Fry"
              width={250}
              height={141}
              className="object-cover w-full aspect-[1920/1080]"
            />
          </div>
          <div className="flex flex-col gap-4 p-6 flex-grow">
            <p className="text-lg italic leading-relaxed">
              &quot;Jag vill inte att någon ska tro att bipolär sjukdom är en
              enkel resa. Men det är en del av vem jag är, och jag skulle inte
              byta bort det.&quot;
            </p>
            <p className="text-sm text-gray-600">
              - Stephen Fry - The Secret Life of the Manic Depressive
            </p>
          </div>
        </div>
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
    </section>
  );
};

export default MoviesPage;
