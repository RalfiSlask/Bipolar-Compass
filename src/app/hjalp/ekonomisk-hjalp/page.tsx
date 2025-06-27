import ComparisonTable from '@/app/components/pages/help/economic-support/ComparisonTable';
import FamilyAgreementSection from '@/app/components/pages/help/economic-support/FamilyAgreementSection';
import GodManSection from '@/app/components/pages/help/economic-support/GodManSection';
import ProxySection from '@/app/components/pages/help/economic-support/ProxySection';
import ProxyTemplate from '@/app/components/pages/help/economic-support/ProxyTemplate';
import SocialSupportSection from '@/app/components/pages/help/economic-support/SocialSupportSection';
import TrusteeSection from '@/app/components/pages/help/economic-support/TrusteeSection';
import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedLinks from '@/app/components/shared/RelatedLinks';
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
