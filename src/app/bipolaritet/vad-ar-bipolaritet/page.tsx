'use client';

import BipolarPrevalenceInfo from '@/app/components/pages/bipolar/BipolarPrevalenceInfo';
import CommonSigns from '@/app/components/pages/bipolar/CommonSigns';
import Genetics from '@/app/components/pages/bipolar/Genetics';
import TreatmentSupport from '@/app/components/pages/bipolar/TreatmentSupport';
import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedContent from '@/app/components/shared/RelatedContent';
import { whatIsBipolarIntro } from '@/app/data/pageIntros';
import { MdPeople, MdTimeline, MdWarning } from 'react-icons/md';

const WhatIsBipolarityPage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={whatIsBipolarIntro} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-10">
        <div className="flex flex-col content-container">
          <div className="flex items-center gap-4 mb-6">
            <MdTimeline className="text-4xl text-primary-dark" />
            <h3 className="h-xs text-primary-dark">
              De olika typerna av bipolär sjukdom
            </h3>
          </div>
          <p className="mb-6 ">
            Bipolär sjukdom är inte en enhetlig diagnos utan kan delas in i
            flera olika typer beroende på symptomens svårighetsgrad och mönster:
          </p>
          <div className="bg-primary-light/50 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Bipolär sjukdom typ 1: Kännetecknas av minst en manisk episod
                som kan vara så allvarlig att sjukhusvård behövs. Episoder av
                depression är också vanliga, men inte nödvändiga för diagnos.
              </li>
              <li>
                Bipolär sjukdom typ 2: Innebär återkommande episoder av
                depression och hypomani, en mildare form av mani. Hypomani leder
                oftast inte till allvarliga funktionsnedsättningar.
              </li>
              <li>
                Cyklotymi: En mildare form av bipolär sjukdom där humöret växlar
                mellan hypomaniliknande och milda depressiva symptom under
                längre tid, ofta flera år.
              </li>
              <li>
                Ospecificerad bipolär sjukdom: Symptom som inte helt passar in i
                någon av ovanstående kategorier men som ändå orsakar betydande
                lidande.
              </li>
            </ul>
          </div>
        </div>

        <CommonSigns />

        <div className="md:col-span-2 content-container">
          <div className="flex items-center gap-4 mb-6">
            <MdPeople className="text-4xl text-primary-dark" />
            <h3 className="h-xs text-primary-dark">
              Vem drabbas av bipolaritet?
            </h3>
          </div>
          <p className="mb-6">
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
        <div className="md:col-span-2 bg-tertiary-light rounded-xl p-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <MdWarning className="text-4xl text-tertiary-dark" />
            <h3 className="h-xs text-tertiary-dark">Viktigt att notera</h3>
          </div>
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
      <RelatedContent currentPage="vad-ar-bipolaritet" />
    </section>
  );
};

export default WhatIsBipolarityPage;
