import Link from 'next/link';
import {
  BiBookHeart,
  BiBrain,
  BiConversation,
  BiFirstAid,
} from 'react-icons/bi';

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
      <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        {currentPage !== 'sjalvhjalp' && (
          <li className="group related-container">
            <Link href="/behandling/sjalvhjalp" aria-label="Gå till självhjälp">
              <BiBookHeart
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">Självhjälp</span>
            </Link>
          </li>
        )}

        {currentPage !== 'terapi' && (
          <li className="group related-container">
            <Link href="/behandling/terapi" aria-label="Läs mer om terapi">
              <BiConversation
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">Terapi</span>
            </Link>
          </li>
        )}

        {currentPage !== 'dokument' && (
          <li className="group related-container">
            <Link
              href="/behandling/dokument"
              aria-label="Lär dig mer om verktyg & dokument"
            >
              <BiBrain
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">Verktyg & Dokument</span>
            </Link>
          </li>
        )}
        {currentPage !== 'medicinska-behandlingar' && (
          <li className="group related-container">
            <Link
              href="/behandling/medicinska-behandlingar"
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
          </li>
        )}
      </nav>
    </div>
  );
};

export default RelatedTreatmentContent;
