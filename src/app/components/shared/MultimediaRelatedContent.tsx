import Link from 'next/link';
import { BiMicrophone, BiMusic } from 'react-icons/bi';
import { MdLocalMovies } from 'react-icons/md';

interface IMultimediaRelatedContentProps {
  currentPage: 'podcasts' | 'musik' | 'filmer';
}

const MultimediaRelatedContent = ({
  currentPage,
}: IMultimediaRelatedContentProps) => {
  return (
    <div className="flex flex-col gap-6 mt-8 border-t border-primary-light/30 pt-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="h-xs lg:text-2xl text-primary-dark mb-3">
          Relaterat innehåll
        </h2>
        <p className="text-primary-dark/80 mb-6">
          Fördjupa dig i fler medier som kan stödja och inspirera.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
        {currentPage !== 'podcasts' && (
          <Link
            href="/multimedia/podcasts"
            className="group flex flex-col bg-primary-dark hover:bg-primary-medium items-center gap-4 transition-all duration-300 text-primary-light hover:text-primary-dark p-8 rounded-lg shadow-sm border border-primary-light/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
            aria-label="Gå till podcasts"
          >
            <BiMicrophone
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
            <span className="font-semibold text-lg">Podcasts</span>
          </Link>
        )}

        {currentPage !== 'musik' && (
          <Link
            href="/multimedia/musik"
            className="group flex flex-col bg-primary-dark hover:bg-primary-medium items-center gap-4 transition-all duration-300 text-primary-light hover:text-primary-dark p-8 rounded-lg shadow-sm border border-primary-light/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
            aria-label="Gå till musik"
          >
            <BiMusic
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
            <span className="font-semibold text-lg">Musik</span>
          </Link>
        )}

        {currentPage !== 'filmer' && (
          <Link
            href="/multimedia/filmer"
            className="group flex flex-col bg-primary-dark hover:bg-primary-medium items-center gap-4 transition-all duration-300 text-primary-light hover:text-primary-dark p-8 rounded-lg shadow-sm border border-primary-light/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
            aria-label="Gå till filmer"
          >
            <MdLocalMovies
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
            <span className="font-semibold text-lg">Filmer</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MultimediaRelatedContent;
