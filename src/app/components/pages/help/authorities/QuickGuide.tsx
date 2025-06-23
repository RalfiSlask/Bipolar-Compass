import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import { QUICK_GUIDE_DATA } from '@/app/data/help/authorities';
import { FaSearch } from 'react-icons/fa';
import QuickGuideCard from './QuickGuideCard';

const QuickGuide = () => {
  return (
    <div className="content-container">
      <SectionTitle icon={<FaSearch />} iconClasses="text-2xl">
        Snabbguide - Vad behöver du hjälp med?
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUICK_GUIDE_DATA.map((card) => {
          const { id, title, description, contacts, type } = card;

          return (
            <QuickGuideCard
              key={id}
              title={title}
              description={description}
              contacts={contacts}
              type={type}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuickGuide;
