'use client';

import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import { RoundedImageWithList } from '@/app/components/shared/RoundedImageWithList';
import { FAMILY_PROXY_SECTION_DATA } from '@/app/data/help/economic';
import { FaHandshake } from 'react-icons/fa';
import FamilyTemplate from './FamilyTemplate';

const FamilyAgreementSection = () => {
  return (
    <div>
      <RoundedImageWithList data={FAMILY_PROXY_SECTION_DATA} />
      <FamilyTemplate />
      <SectionTitle icon={<FaHandshake />}>
        Praktiska verktyg för ekonomi
      </SectionTitle>
      <div className="flex flex-col md:flex-row content-container gap-4 sm:gap-6">
        <div className="flex-1 lightest-list-container">
          <h4 className="font-semibold text-primary-dark mb-3">
            Rekommenderade appar och verktyg:
          </h4>
          <ul className="flex flex-col gap-2 list-disc list-inside">
            <li>Koll på pengarna (Konsumentverket) - gratis budgetverktyg</li>
            <li>Din banks egna app - för överblick över ekonomi</li>
            <li>Automatiska överföringar till sparkonto</li>
            <li>Budgetmallar från Konsumentverket</li>
          </ul>
        </div>

        <div className="flex-1 lightest-list-container">
          <h4 className="font-semibold text-primary-dark mb-3">
            Strategier för att undvika impulsiva köp:
          </h4>
          <ul className="flex flex-col gap-2 list-disc list-inside">
            <li>Sätt upp köpgränser på kort</li>
            <li>Använd separata konton för olika ändamål</li>
            <li>Skapa en &quot;kylperiod&quot; för större köp</li>
            <li>Planera inköp i förväg</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FamilyAgreementSection;
