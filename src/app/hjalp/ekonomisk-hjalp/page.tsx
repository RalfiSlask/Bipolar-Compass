import ComparisonTable from '@/app/components/pages/help/economic-support/ComparisonTable';
import FamilyAgreementSection from '@/app/components/pages/help/economic-support/FamilyAgreementSection';
import GodManSection from '@/app/components/pages/help/economic-support/GodManSection';
import ProxySection from '@/app/components/pages/help/economic-support/ProxySection';
import ProxyTemplate from '@/app/components/pages/help/economic-support/ProxyTemplate';
import SocialSupportSection from '@/app/components/pages/help/economic-support/SocialSupportSection';
import TrusteeSection from '@/app/components/pages/help/economic-support/TrusteeSection';
import ContactCardsContainer from '@/app/components/shared/ContactCardsContainer';
import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import { MediumImageWithText } from '@/app/components/shared/MediumImageWithText';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedLinks from '@/app/components/shared/RelatedLinks';
import { ECONOMIC_CONTACTS } from '@/app/data/help/economic';
import { ECONOMIC_HELP_INTRO } from '@/app/data/pageIntros';
import { HELP_RELATED_LINKS } from '@/app/data/related/relatedContentLinks';

const EconomicHelpPage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={ECONOMIC_HELP_INTRO} />
      <div className="flex flex-col page-gap">
        <ComparisonTable />
        <ProxySection />
        <ProxyTemplate />
        <GodManSection />
        <TrusteeSection />
        <FamilyAgreementSection />
        <SocialSupportSection />
        <MediumImageWithText
          title="Budget- och skuldrådgivning"
          description="Många kommuner erbjuder gratis budget- och skuldrådgivning. Detta kan vara särskilt värdefullt om du har svårt att hålla koll på din ekonomi eller har hamnat i ekonomiska svårigheter."
          image="/images/help/economic/budget.webp"
          imageAlt="En miniräknare, penna, ett par gem och en blomväxt ovanpå ett papper är placerad på ett bord"
        />
        <ContactCardsContainer contacts={ECONOMIC_CONTACTS} />
        <EncouragmentContainer
          text="Att ta proaktiva steg för att skydda din ekonomi är ett tecken på styrka och självinsikt. 
          Genom att planera i förväg och sätta upp rätt skyddsåtgärder kan du minska risken för 
          ekonomiska problem under svåra perioder. Kom ihåg att det finns hjälp att få och att 
          du inte behöver hantera detta ensam."
        />

        <RelatedLinks
          linksInfo={HELP_RELATED_LINKS}
          currentPage="ekonomisk-hjalp"
        />
      </div>
    </section>
  );
};

export default EconomicHelpPage;
