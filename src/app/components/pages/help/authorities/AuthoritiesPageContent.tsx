'use client';

import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import ListWithHeading from '@/app/components/shared/lists/ListWithHeading';
import { MediumImageWithText } from '@/app/components/shared/MediumImageWithText';
import {
  PREPARE_LIST_BEFORE_CALLING,
  WHAT_TO_EXPECT,
} from '@/app/data/help/authorities';
import { FaPhone, FaSearch } from 'react-icons/fa';
import AuthoritiesGrid from './AuthoritiesGrid';

const AuthoritiesPageContent = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-10">
      <AuthoritiesGrid
        title="Alla myndigheter"
        description="Sök och filtrera bland alla myndigheter som kan hjälpa dig. Använd sökfältet för att hitta specifika myndigheter eller tjänster, eller använd filtret för att se myndigheter som erbjuder vissa tjänster."
      />

      <div className="content-container">
        <SectionTitle icon={<FaPhone />}>
          Tips för att kontakta myndigheter
        </SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ListWithHeading listInfo={PREPARE_LIST_BEFORE_CALLING} />
          <ListWithHeading listInfo={WHAT_TO_EXPECT} />
        </div>
      </div>

      <MediumImageWithText
        title="Dina rättigheter som patient"
        description="Som patient i Sverige har du flera viktiga rättigheter. Du har rätt till information om din sjukdom och behandling, rätt till delaktighet i vårdbeslut, och rätt till sekretess. Du har också rätt att få en andra åsikt och att överklaga vårdbeslut. Om du känner att dina rättigheter inte respekteras, kan du vända dig till IVO eller DO för hjälp."
        image="/images/help/authorities/patient-rights.webp"
        imageAlt="Patienträttigheter"
      />
      <div className="content-container">
        <SectionTitle icon={<FaSearch />}>
          Snabbguide - Vad behöver du hjälp med?
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-primary-light rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-bold text-primary-dark mb-3">
              Vård och behandling
            </h3>
            <p className="text-primary-dark mb-4">
              Behöver du hjälp med vårdkontakter, andra åsikter eller klagomål?
            </p>
            <div className="text-sm text-primary-dark">
              <p className="font-semibold mb-2">Kontakta:</p>
              <ul className="list-disc list-inside flex flex-col gap-1">
                <li>1177 Vårdguiden</li>
                <li>IVO (klagomål)</li>
                <li>Din vårdgivare</li>
              </ul>
            </div>
          </div>

          <div className="bg-tertiary-light rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-bold text-tertiary-dark mb-3">
              Ekonomiskt stöd
            </h3>
            <p className="text-tertiary-dark mb-4">
              Behöver du hjälp med ersättningar, bidrag eller ekonomiskt
              bistånd?
            </p>
            <div className="text-sm text-tertiary-dark">
              <p className="font-semibold mb-2">Kontakta:</p>
              <ul className="list-disc list-inside flex flex-col gap-1">
                <li>Försäkringskassan</li>
                <li>Socialtjänsten</li>
                <li>Arbetsförmedlingen</li>
              </ul>
            </div>
          </div>

          <div className="bg-primary-light rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-bold text-primary-dark mb-3">
              Rättigheter och diskriminering
            </h3>
            <p className="text-primary-dark mb-4">
              Har du blivit diskriminerad eller känner att dina rättigheter
              kränkts?
            </p>
            <div className="text-sm text-primary-dark">
              <p className="font-semibold mb-2">Kontakta:</p>
              <ul className="list-disc list-inside flex flex-col gap-1">
                <li>Diskrimineringsombudsmannen</li>
                <li>Justitieombudsmannen</li>
                <li>IVO</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthoritiesPageContent;
