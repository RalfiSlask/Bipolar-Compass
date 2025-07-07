import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedLinks from '@/app/components/shared/RelatedLinks';
import { THERAPY_INTRO } from '@/app/data/pageIntros';
import { TREATMENT_RELATED_LINKS } from '@/app/data/related/relatedContentLinks';
import AccessToTherapySection from './components/AccessToTherapySection';
import ChoosingTherapySection from './components/ChoosingTherapySection';
import CombinedTreatmentSection from './components/CombinedTreatmentSection';
import DigitalTherapySection from './components/DigitalTherapySection';
import GroupTherapySection from './components/GroupTherapySection';
import IPSRTSection from './components/IPSRTSection';
import KBTSection from './components/KBTSection';
import PsychoeducationSection from './components/PsychoeducationSection';
import SelfHelpSection from './components/SelfHelpSection';

const TherapyPage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={THERAPY_INTRO} />
      <div className="flex flex-col page-gaps">
        <KBTSection />
        <IPSRTSection />
        <PsychoeducationSection />
        <CombinedTreatmentSection />
        <GroupTherapySection />
        <DigitalTherapySection />
        <ChoosingTherapySection />
        <SelfHelpSection />
        <AccessToTherapySection />
        <EncouragmentContainer text="Terapier är ett värdefullt verktyg för att hantera bipolär sjukdom. Oavsett vilken terapiform du väljer är det viktigaste att du tar första steget mot att söka hjälp. Vi är här för att stödja dig på din resa mot bättre hälsa och balans i livet." />
        <RelatedLinks
          linksInfo={TREATMENT_RELATED_LINKS}
          currentPage="terapi"
        />
      </div>
    </section>
  );
};

export default TherapyPage;
