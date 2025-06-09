'use client';

import Guide from '@/app/components/pages/treatment/Guide';
import Questionaire from '@/app/components/pages/treatment/Questionaire';
import ToolsModal from '@/app/components/pages/treatment/ToolsModal';
import RelatedTreatmentContent from '@/app/components/shared/RelatedTreatmentContent';
import {
  scoringInfo,
  selfAssessmentForms,
} from '@/app/data/selfAssesmentForms';
import Image from 'next/image';
import { useState } from 'react';

const DocumentsPage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <section className="container max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-10 sm:py-10 min-h-screen">
      <div className="mb-4 sm:mb-10 flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-4">
            Dokument
          </h2>
          <p className="text-primary-dark">
            Välkommen till vår dokumentsektion, där du kan hitta ett urval av
            formulär för självskattning och guider som hjälper dig att förstå
            och hantera bipolär sjukdom. Dessa resurser är framtagna för att
            stötta dig och ge dig praktiska verktyg i din vardag.
          </p>
          <p className="text-primary-dark mt-4 font-semibold">
            Dessa formulär kan vara användbara för att reflektera över ditt
            mående och förbereda dig inför möten med vårdpersonal.
          </p>
        </div>
        <div className="flex-1 rounded-sm overflow-hidden">
          <Image
            src="/images/bipolar/form.webp"
            alt="Bipolar Logo"
            width={2000}
            height={1333}
            quality={80}
            priority={true}
            className="w-full"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
        </div>
      </div>
      <Guide />
      <div className="bg-whitep-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <h2 className="text-xl font-semibold text-primary-dark mb-4">
          Formulär för självskattning
        </h2>
        <p className="text-sm text-primary-accent italic mb-6">
          Klicka på &quot;Poängsystem&quot; för att se hur formulären ska tolkas
        </p>
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {selfAssessmentForms.map((form) => (
            <Questionaire
              key={form.scoringId}
              form={form}
              setActiveModal={setActiveModal}
            />
          ))}
        </div>
      </div>

      {activeModal && (
        <ToolsModal
          info={scoringInfo[activeModal]}
          onClose={() => setActiveModal(null)}
        />
      )}
      <RelatedTreatmentContent currentPage="dokument" />
    </section>
  );
};

export default DocumentsPage;
