import Link from 'next/link';
import { MdGavel } from 'react-icons/md';

interface IHelpRelatedContentProps {
  currentPage: 'myndigheter' | 'juridik-och-raattigheter';
}

const HelpRelatedContent = ({ currentPage }: IHelpRelatedContentProps) => {
  return (
    <div className="flex flex-col gap-6 border-t border-primary-light/30 pt-10">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="h-xs lg:text-2xl text-primary-dark mb-3">
          Relaterat innehåll
        </h2>
        <p className="text-primary-dark/80 mb-6">
          Här hittar du mer information som kan vara till hjälp för dig.
        </p>
      </div>
      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full list-none">
        {currentPage !== 'juridik-och-raattigheter' && (
          <li className="group related-container">
            <Link href="/juridik" aria-label="Gå till juridik och rättigheter">
              <MdGavel
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-semibold text-lg">
                Juridik och rättigheter
              </span>
            </Link>
          </li>
        )}
      </nav>
    </div>
  );
};

export default HelpRelatedContent;
