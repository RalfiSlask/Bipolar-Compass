import BenefitCard from '@/app/components/pages/help/law-and-rights/BenefitCard';
import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import { SOCIAL_SUPPORT_BENEFITS } from '@/app/data/help/economic';
import { FaHandHoldingHeart } from 'react-icons/fa';

const SocialSupportSection = () => {
  return (
    <div className="content-container">
      <SectionTitle icon={<FaHandHoldingHeart />} type="tertiary">
        Ekonomiskt stöd från samhället
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {SOCIAL_SUPPORT_BENEFITS.map((benefit) => (
          <BenefitCard key={benefit.title} {...benefit} />
        ))}
      </div>
    </div>
  );
};

export default SocialSupportSection;
