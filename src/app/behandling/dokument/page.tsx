'use client';

import {
  scoringInfo,
  selfAssessmentForms,
} from '@/app/data/selfAssesmentForms';
import { IScoringInfo } from '@/app/types/documents';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiDownload, HiEye, HiInformationCircle } from 'react-icons/hi';

const Modal = ({
  info,
  onClose,
}: {
  info: IScoringInfo;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[140]"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="fixed bg-white p-6 rounded-lg max-w-md w-[95%] sm:w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h4
          id="modal-title"
          className="text-xl font-semibold text-primary-dark mb-4"
        >
          {info.title}
        </h4>
        <ul className="flex flex-col gap-3 mb-6">
          {info.content.map((item: string, index: number) => (
            <li
              key={index}
              className="text-primary-accent flex items-start gap-2"
            >
              <span className="text-primary-dark mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="w-full bg-primary-accent hover:bg-primary-dark text-white py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2"
        >
          Stäng
        </button>
      </div>
    </div>
  );
};

const DocumentsPage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <section className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-screen">
      <div className="mb-12 flex flex-col md:flex-row gap-10">
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

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8 sm:mb-12 hover:shadow-lg transition-shadow duration-200">
        <h2 className="text-xl font-semibold text-primary-dark mb-4">
          Guide för att leva med bipolär sjukdom
        </h2>
        <p className="text-primary-dark mb-6 font-medium text-sm">
          En omfattande guide som hjälper dig att hantera vardagen med bipolär
          sjukdom. Guiden innehåller praktiska råd om:
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <ul className="space-y-2 text-sm text-primary-dark">
            {[
              'Igenkänning av tidiga varningstecken',
              'Strategier för att hantera både maniska och depressiva episoder',
              'Tips för bättre sömnrutiner och stresshantering',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary-accent mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
          <ul className="space-y-2 text-sm text-primary-dark">
            {[
              'Råd om medicinering och behandling',
              'Information för anhöriga',
              'Kontaktinformation till vårdresurser',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary-accent mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="../pdfs/guide.pdf"
            download="guide.pdf"
            className="flex-1 flex items-center justify-center gap-2 bg-primary-accent/60 hover:text-white  text-dark bg-primary-accent hover:bg-primary-dark  py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2"
          >
            <HiDownload className="text-xl" aria-hidden="true" />
            <span className="text-sm md:text-base lg:text-lg">Ladda ner</span>
          </a>
          <a
            href="../pdfs/guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 border border-primary-border text-primary-dark hover:bg-primary-light py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2"
          >
            <HiEye className="text-xl" aria-hidden="true" />
            <span className="text-sm md:text-base lg:text-lg">Visa guide</span>
          </a>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <h2 className="text-xl font-semibold text-primary-dark mb-4">
          Formulär för självskattning
        </h2>
        <p className="text-sm text-primary-accent italic mb-6">
          Klicka på &quot;Poängsystem&quot; för att se hur formulären ska tolkas
        </p>
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {selfAssessmentForms.map((form, index) => (
            <div
              key={index}
              className="flex flex-col h-full p-4 rounded-lg border border-gray-100 hover:border-primary-border transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-3 gap-4">
                <h3 className="text-primary-dark font-semibold">
                  {form.title}
                </h3>
                {form.scoringId && (
                  <button
                    onClick={() => setActiveModal(form.scoringId)}
                    className="flex items-center gap-2 text-primary-accent hover:text-primary-dark transition-colors px-3 py-1 rounded-full border border-primary-border hover:bg-primary-light"
                    aria-label={`Visa poängsystem för ${form.title}`}
                  >
                    <HiInformationCircle
                      className="text-xl"
                      aria-hidden="true"
                    />
                    <span className="text-sm">Poängsystem</span>
                  </button>
                )}
              </div>
              <p className="text-primary-accent text-sm mb-6 flex-grow">
                {form.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a
                  href={form.href}
                  download
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-accent/60 hover:bg-primary-dark hover:text-white text-dark py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2"
                  aria-label={form.ariaLabel}
                >
                  <HiDownload className="text-xl" aria-hidden="true" />
                  <span className="text-sm md:text-base lg:text-lg">
                    Ladda ner
                  </span>
                </a>
                <a
                  href={form.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-primary-border text-primary-dark hover:bg-primary-light py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2"
                >
                  <HiEye className="text-xl" aria-hidden="true" />
                  <span className="text-sm md:text-base lg:text-lg">
                    Visa formulär
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeModal && (
        <Modal
          info={scoringInfo[activeModal]}
          onClose={() => setActiveModal(null)}
        />
      )}
    </section>
  );
};

export default DocumentsPage;
