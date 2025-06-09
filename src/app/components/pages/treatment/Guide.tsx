import {
  LEFT_TOOL_GUIDE_LIST,
  RIGHT_TOOL_GUIDE_LIST,
} from '@/app/data/tools/tools';
import { HiDownload, HiEye } from 'react-icons/hi';
import GuideList from './GuideList';

const Guide = () => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8 sm:mb-12 hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-primary-dark mb-4">
        Guide för att leva med bipolär sjukdom
      </h2>
      <p className="text-primary-dark mb-6 font-medium text-sm">
        En omfattande guide som hjälper dig att hantera vardagen med bipolär
        sjukdom. Guiden innehåller praktiska råd om:
      </p>
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <GuideList guideList={LEFT_TOOL_GUIDE_LIST} />
        <GuideList guideList={RIGHT_TOOL_GUIDE_LIST} />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="../pdfs/guide.pdf?download=true"
          download="guide.pdf"
          aria-label="Ladda ner guide som pdf"
          className="flex-1 flex items-center justify-center gap-2 bg-primary-accent/60 hover:text-white  text-dark bg-primary-accent hover:bg-primary-dark  py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2"
        >
          <HiDownload className="text-xl" aria-hidden="true" />
          <span className="text-sm md:text-base lg:text-lg">Ladda ner</span>
        </a>
        <a
          href="../pdfs/guide.pdf#view"
          target="_blank"
          aria-label="Visa guide som PDF i ny flik"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 border border-primary-border text-primary-dark hover:bg-primary-light py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2"
        >
          <HiEye className="text-xl" aria-hidden="true" />
          <span className="text-sm md:text-base lg:text-lg">Visa guide</span>
        </a>
      </div>
    </div>
  );
};

export default Guide;
