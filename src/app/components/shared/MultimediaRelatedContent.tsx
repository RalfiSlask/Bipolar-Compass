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
    <div className="flex flex-col gap-6 border-t border-primary-light/30 pt-10">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="h-xs lg:text-2xl text-primary-dark mb-3">
          Relaterat innehåll
        </h2>
        <p className="text-primary-dark/80 mb-6">
          Fördjupa dig i fler medier som kan stödja och inspirera.
        </p>
      </div>
      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full list-none">
        {currentPage !== 'podcasts' && (
          <li className="group related-container">
            <Link href="/multimedia/podcasts" aria-label="Gå till podcasts">
              <BiMicrophone
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">Podcasts</span>
            </Link>
          </li>
        )}

        {currentPage !== 'musik' && (
          <li className="group related-container">
            <Link href="/multimedia/musik" aria-label="Gå till musik">
              <BiMusic
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">Musik</span>
            </Link>
          </li>
        )}

        {currentPage !== 'filmer' && (
          <li className="group related-container">
            <Link href="/multimedia/filmer" aria-label="Gå till filmer">
              <MdLocalMovies
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">Filmer</span>
            </Link>
          </li>
        )}
      </nav>
    </div>
  );
};

export default MultimediaRelatedContent;
