import AgreementRights from '@/app/components/pages/help/law-and-rights/AgreementRights';
import BenefitCard from '@/app/components/pages/help/law-and-rights/BenefitCard';
import LPT from '@/app/components/pages/help/law-and-rights/LPT';
import LawFirms from '@/app/components/pages/help/law-and-rights/LawFirms';
import OfficialSourcesList from '@/app/components/pages/help/law-and-rights/OfficialSourcesList';
import PatientRights from '@/app/components/pages/help/law-and-rights/PatientRights';
import WorkRights from '@/app/components/pages/help/law-and-rights/WorkRights';
import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import FlowChart from '@/app/components/shared/FlowChart';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedLinks from '@/app/components/shared/RelatedLinks';
import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import {
  LAW_RIGHTS_BENEFITS,
  LAW_RIGHTS_FLOW_CHART,
  OFFICIAL_AUTHORITIES,
  OFFICIAL_LAWS,
} from '@/app/data/help/lawRights';
import { LAWS_AND_RIGHTS_INTRO } from '@/app/data/pageIntros';
import { HELP_RELATED_LINKS } from '@/app/data/related/relatedContentLinks';
import { FaBalanceScale, FaBook, FaFileAlt, FaHandshake } from 'react-icons/fa';

const LegalRightsPage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={LAWS_AND_RIGHTS_INTRO} />
      <div className="flex flex-col gap-4 sm:gap-10">
        <div className="content-container text-left">
          <SectionTitle icon={<FaBook />}>
            Officiella källor och information
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OfficialSourcesList
              title="Viktiga myndigheter"
              items={OFFICIAL_AUTHORITIES}
            />
            <OfficialSourcesList
              title="Lagar och förordningar"
              items={OFFICIAL_LAWS}
            />
          </div>
        </div>
        <PatientRights />
        <LPT />
        <WorkRights />
        <div className="content-container">
          <SectionTitle icon={<FaHandshake />} type="tertiary">
            Ekonomiskt stöd och ersättningar
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {LAW_RIGHTS_BENEFITS.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
        <div className="content-container">
          <SectionTitle icon={<FaFileAlt />}>
            Lag om avtal under psykisk påverkan
          </SectionTitle>
          <AgreementRights />
        </div>
        <LawFirms />
        <div className="content-container">
          <SectionTitle
            icon={<FaBalanceScale />}
            extraClasses="justify-center xl:justify-start"
          >
            Hur hanterar man rättighetskränkningar?
          </SectionTitle>
          <FlowChart
            description="Nedan följer ett steg-för-steg flödesschema som visar hur du kan gå tillväga när du upplever en rättighetskränkning."
            title="Din väg till rättvisa"
            flowChartSteps={LAW_RIGHTS_FLOW_CHART}
          />
        </div>
        <EncouragmentContainer text="Att känna till dina rättigheter är ett viktigt steg i att ta kontroll över din situation. Kom ihåg att du har rätt till stöd och hjälp, och att det finns många resurser tillgängliga för dig. Var inte rädd för att söka hjälp eller ställa frågor när du behöver det." />
        <RelatedLinks
          linksInfo={HELP_RELATED_LINKS}
          currentPage="juridik-och-raattigheter"
        />
      </div>
    </section>
  );
};

export default LegalRightsPage;
