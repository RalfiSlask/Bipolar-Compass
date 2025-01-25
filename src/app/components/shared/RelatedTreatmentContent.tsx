import Link from 'next/link';
import { BiBookHeart, BiBrain, BiConversation, BiFirstAid } from 'react-icons/bi';

interface IRelatedTreatmentContentProps {
  currentPage: 'medicinska-behandlingar' | 'sjalvhjalp' | 'terapi' | 'dokument';
}

const RelatedTreatmentContent = ({
  currentPage,
}: IRelatedTreatmentContentProps) => {
  return (
    <div className="flex flex-col gap-6 mt-8 border-t border-primary-light/30 pt-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="h-xs lg:text-2xl text-primary-dark mb-3">
          Relaterat innehåll
        </h2>
        <p className="text-primary-dark/80 mb-6">
          Utforska mer information om behandling av bipolaritet genom dessa
          länkar.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        {currentPage !== 'sjalvhjalp' && (
          <Link
            href="/behandling/sjalvhjalp"
            className="group flex flex-col bg-primary-dark hover:bg-primary-medium items-center gap-4 transition-all duration-300 text-primary-light hover:text-primary-dark p-8 rounded-lg shadow-sm border border-primary-light/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
            aria-label="Gå till självhjälp"
          >
            <BiBookHeart
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
            <span className="font-semibold text-lg">Självhjälp</span>
          </Link>
        )}

        {currentPage !== 'terapi' && (
          <Link
            href="/behandling/terapi"
            className="group flex flex-col bg-primary-dark hover:bg-primary-medium items-center gap-4 transition-all duration-300 text-primary-light hover:text-primary-dark p-8 rounded-lg shadow-sm border border-primary-light/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
            aria-label="Läs mer om terapi"
          >
            <BiConversation
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
            <span className="font-semibold text-lg">Terapi</span>
          </Link>
        )}

        {currentPage !== 'dokument' && (
          <Link
            href="/behandling/dokument"
            className="group flex flex-col bg-primary-dark hover:bg-primary-medium items-center gap-4 transition-all duration-300 text-primary-light hover:text-primary-dark p-8 rounded-lg shadow-sm border border-primary-light/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
            aria-label="Lär dig mer om verktyg & dokument"
          >
            <BiBrain
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
            <span className="font-semibold text-lg">Verktyg & Dokument</span>
          </Link>
        )}
        {currentPage !== 'medicinska-behandlingar' && (
          <Link
            href="/behandling/medicinska-behandlingar"
            className="group flex flex-col bg-primary-dark hover:bg-primary-medium items-center gap-4 transition-all duration-300 text-primary-light hover:text-primary-dark p-8 rounded-lg shadow-sm border border-primary-light/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
            aria-label="Lär dig mer om diagnoser för bipolär sjukdom"
          >
            <BiFirstAid
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
            <span className="font-semibold text-lg">
              Medicinska behandlingar
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RelatedTreatmentContent;
