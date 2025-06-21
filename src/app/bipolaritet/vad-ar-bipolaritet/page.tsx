'use client';

import BipolarPrevalenceInfo from '@/app/components/pages/bipolar/BipolarPrevalenceInfo';
import CommonSigns from '@/app/components/pages/bipolar/CommonSigns';
import Genetics from '@/app/components/pages/bipolar/Genetics';
import TreatmentSupport from '@/app/components/pages/bipolar/TreatmentSupport';
import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import HighlightList from '@/app/components/shared/lists/HighlightList';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedLinks from '@/app/components/shared/RelatedLinks';
import { WHAT_IS_BIPOLAR_INTRO } from '@/app/data/pageIntros';
import { BIPOLAR_RELATED_LINKS } from '@/app/data/related/relatedContentLinks';
import { MdPeople, MdTimeline, MdWarning } from 'react-icons/md';

const WhatIsBipolarityPage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={WHAT_IS_BIPOLAR_INTRO} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-10">
        <div className="flex flex-col content-container">
          <SectionTitle icon={<MdTimeline />} type="primary">
            De olika typerna av bipolär sjukdom
          </SectionTitle>
          <p className="mb-6 ">
            Bipolär sjukdom är inte en enhetlig diagnos utan kan delas in i
            flera olika typer beroende på symptomens svårighetsgrad och mönster:
          </p>
          <HighlightList
            list={[
              'Bipolär sjukdom typ 1: Kännetecknas av minst en manisk episod som kan vara så allvarlig att sjukhusvård behövs. Episoder av depression är också vanliga, men inte nödvändiga för diagnos.',
              'Bipolär sjukdom typ 2: Innebär återkommande episoder av depression och hypomani, en mildare form av mani. Hypomani leder oftast inte till allvarliga funktionsnedsättningar.',
              'Cyklotymi: En mildare form av bipolär sjukdom där humöret växlar mellan hypomaniliknande och milda depressiva symptom under längre tid, ofta flera år.',
              'Ospecificerad bipolär sjukdom: Symptom som inte helt passar in i någon av ovanstående kategorier men som ändå orsakar betydande lidande.',
            ]}
          />
        </div>
        <CommonSigns />
        <div className="md:col-span-2 content-container-tertiary">
          <SectionTitle icon={<MdPeople />} type="tertiary">
            Vem drabbas av bipolaritet?
          </SectionTitle>
          <p className="mb-6 text-tertiary-dark">
            Bipolaritet kan drabba vem som helst, oavsett ålder, kön eller
            bakgrund. Sjukdomen debuterar ofta i sena tonåren eller tidig vuxen
            ålder och har en livslång karaktär. Den exakta orsaken är inte känd,
            men en kombination av genetiska, biologiska och miljömässiga
            faktorer tros spela en roll.
          </p>
        </div>
        <div className="md:col-span-2">
          <Genetics />
        </div>
        <TreatmentSupport />
        <BipolarPrevalenceInfo />
        <div className="md:col-span-2 bg-tertiary-light rounded-xl p-4 sm:p-8 shadow-lg">
          <SectionTitle icon={<MdWarning />} type="tertiary">
            Viktigt att notera
          </SectionTitle>
          <div className="flex flex-col">
            <p className="text-tertiary-dark">
              Eftersom många individer inte söker vård eller får korrekt
              diagnos, tros det finnas ett mörkertal av personer som lever med
              bipolär sjukdom utan att vara medvetna om det. Tidig diagnos och
              behandling är avgörande för att förbättra prognosen och
              livskvaliteten.
            </p>
          </div>
        </div>
      </div>
      <EncouragmentContainer
        text="Bipolaritet är inte en svaghet eller ett personlighetsdrag – det
              är en medicinsk sjukdom som kräver vård och behandling. Med rätt
              stöd kan personer med bipolär sjukdom leva ett meningsfullt och
              produktivt liv."
      />
      <RelatedLinks
        linksInfo={BIPOLAR_RELATED_LINKS}
        currentPage="vad-ar-bipolaritet"
      />
    </section>
  );
};

export default WhatIsBipolarityPage;
