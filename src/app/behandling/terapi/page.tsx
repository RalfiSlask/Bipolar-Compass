import EncouragmentContainer from "@/app/components/shared/EncouragmentContainer";
import PageIntroContainer from "@/app/components/shared/PageIntroContainer";
import RelatedLinks from "@/app/components/shared/RelatedLinks";
import { THEAPY_INTRO } from "@/app/data/pageIntros";
import { TREATMENT_RELATED_LINKS } from "@/app/data/related/relatedContentLinks";
import KBTSection from "./components/KBTSection";
import IPSRTSection from "./components/IPSRTSection";
import PsychoeducationSection from "./components/PsychoeducationSection";
import GroupTherapySection from "./components/GroupTherapySection";
import DigitalTherapySection from "./components/DigitalTherapySection";
import ChoosingTherapySection from "./components/ChoosingTherapySection";
import CombinedTreatmentSection from "./components/CombinedTreatmentSection";
import SelfHelpSection from "./components/SelfHelpSection";
import AccessToTherapySection from "./components/AccessToTherapySection";

const TherapyPage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={THEAPY_INTRO} />
      <div className="flex flex-col gap-4 sm:gap-10">
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
