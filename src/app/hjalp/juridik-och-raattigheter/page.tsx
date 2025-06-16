import HelpRelatedContent from '@/app/components/pages/help/HelpRelatedContent';
import AgreementRights from '@/app/components/pages/help/law-and-rights/AgreementRights';
import BenefitCard from '@/app/components/pages/help/law-and-rights/BenefitCard';
import LPT from '@/app/components/pages/help/law-and-rights/LPT';
import LawFirms from '@/app/components/pages/help/law-and-rights/LawFirms';
import PatientRights from '@/app/components/pages/help/law-and-rights/PatientRights';
import RightsFlowChart from '@/app/components/pages/help/law-and-rights/RightsFlowChart';
import WorkRights from '@/app/components/pages/help/law-and-rights/WorkRights';
import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import OfficialSourcesList from '@/app/components/shared/OfficialSourcesList';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import {
  LAW_RIGHTS_BENEFITS,
  OFFICIAL_AUTHORITIES,
  OFFICIAL_LAWS,
} from '@/app/data/help/lawRights';
import { LAWS_AND_RIGHTS_INTRO } from '@/app/data/pageIntros';
import { FaBalanceScale, FaBook, FaFileAlt, FaHandshake } from 'react-icons/fa';

const LegalRightsPage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={LAWS_AND_RIGHTS_INTRO} />
      <div className="flex flex-col gap-4 sm:gap-10">
        <div className="content-container text-center sm:text-left">
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
        <div className="content-container text-center sm:text-left">
          <SectionTitle icon={<FaHandshake />} type="tertiary">
            Ekonomiskt stöd och ersättningar
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LAW_RIGHTS_BENEFITS.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
        <div className="content-container text-center sm:text-left">
          <SectionTitle icon={<FaFileAlt />}>
            Lag om avtal under psykisk påverkan
          </SectionTitle>
          <AgreementRights />
        </div>
        <LawFirms />
        <div className="content-container text-center sm:text-left">
          <SectionTitle icon={<FaBalanceScale />}>
            Hur hanterar man rättighetskränkningar?
          </SectionTitle>
          <RightsFlowChart />
        </div>
        <EncouragmentContainer text="Att känna till dina rättigheter är ett viktigt steg i att ta kontroll över din situation. Kom ihåg att du har rätt till stöd och hjälp, och att det finns många resurser tillgängliga för dig. Var inte rädd för att söka hjälp eller ställa frågor när du behöver det." />
        <HelpRelatedContent currentPage="juridik-och-raattigheter" />
      </div>
    </section>
  );
};

export default LegalRightsPage;
