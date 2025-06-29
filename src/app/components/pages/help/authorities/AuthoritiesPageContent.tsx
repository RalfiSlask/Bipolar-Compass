'use client';

import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import ListWithHeading from '@/app/components/shared/lists/ListWithHeading';
import { MediumImageWithText } from '@/app/components/shared/MediumImageWithText';
import {
  PREPARE_LIST_BEFORE_CALLING,
  WHAT_TO_EXPECT_LIST,
} from '@/app/data/help/authorities';
import { FaPhone } from 'react-icons/fa';
import AuthoritiesGrid from './AuthoritiesGrid';
import QuickGuide from './QuickGuide';

const AuthoritiesPageContent = () => {
  return (
    <div className="flex flex-col page-gaps">
      <AuthoritiesGrid
        title="Alla myndigheter"
        description="Sök och filtrera bland alla myndigheter som kan hjälpa dig. Använd sökfältet för att hitta specifika myndigheter eller tjänster, eller använd filtret för att se myndigheter som erbjuder vissa tjänster."
      />

      <div className="content-container">
        <SectionTitle icon={<FaPhone />} iconClasses="text-2xl">
          Tips för att kontakta myndigheter
        </SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          <ListWithHeading listInfo={PREPARE_LIST_BEFORE_CALLING} />
          <ListWithHeading listInfo={WHAT_TO_EXPECT_LIST} />
        </div>
      </div>

      <MediumImageWithText
        title="Dina rättigheter som patient"
        description="Som patient i Sverige har du flera viktiga rättigheter. Du har rätt till information om din sjukdom och behandling, rätt till delaktighet i vårdbeslut, och rätt till sekretess. Du har också rätt att få en andra åsikt och att överklaga vårdbeslut. Om du känner att dina rättigheter inte respekteras, kan du vända dig till IVO eller DO för hjälp."
        image="/images/help/authorities/patient-rights.webp"
        imageAlt="Patienträttigheter"
      />
      <QuickGuide />
    </div>
  );
};

export default AuthoritiesPageContent;
