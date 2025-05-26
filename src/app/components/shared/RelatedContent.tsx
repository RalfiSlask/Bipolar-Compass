import Link from 'next/link';
import { BiBrain } from 'react-icons/bi';
import { FaQuestionCircle } from 'react-icons/fa';
import { MdOutlineWavingHand } from 'react-icons/md';
import { TbStethoscope } from 'react-icons/tb';

interface IRelatedContentProps {
  currentPage:
    | 'diagnoser'
    | 'symptom'
    | 'vad-ar-bipolaritet'
    | 'vanliga-fragor';
}

const RelatedContent = ({ currentPage }: IRelatedContentProps) => {
  return (
    <div className="flex flex-col gap-6 border-t border-primary-light/30 pt-4 sm:pt-10">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="h-xs lg:text-2xl text-primary-dark mb-3">
          Relaterat innehåll
        </h2>
        <p className="text-primary-dark/80 mb-6">
          Utforska mer information om bipolär sjukdom genom dessa länkar
        </p>
      </div>
      <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        {currentPage !== 'vanliga-fragor' && (
          <li className="group related-container">
            <Link
              href="/bipolaritet/vanliga-fragor"
              aria-label="Gå till vanliga frågor om bipolär sjukdom"
            >
              <FaQuestionCircle
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">Vanliga frågor</span>
            </Link>
          </li>
        )}

        {currentPage !== 'symptom' && (
          <li className="group related-container">
            <Link
              href="/bipolaritet/symptom"
              aria-label="Läs mer om symptom vid bipolär sjukdom"
            >
              <MdOutlineWavingHand
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">Symptom</span>
            </Link>
          </li>
        )}

        {currentPage !== 'vad-ar-bipolaritet' && (
          <li className="group related-container">
            <Link
              href="/bipolaritet/vad-ar-bipolaritet"
              aria-label="Lär dig mer om vad bipolär sjukdom är"
            >
              <BiBrain
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">
                Vad är bipolär sjukdom?
              </span>
            </Link>
          </li>
        )}
        {currentPage !== 'diagnoser' && (
          <li className="group related-container">
            <Link
              href="/bipolaritet/diagnoser"
              aria-label="Lär dig mer om diagnoser för bipolär sjukdom"
            >
              <TbStethoscope
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">Diagnoser</span>
            </Link>
          </li>
        )}
      </nav>
    </div>
  );
};

export default RelatedContent;
