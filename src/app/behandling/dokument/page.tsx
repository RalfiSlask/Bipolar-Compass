'use client';

import {
  scoringInfo,
  selfAssessmentForms,
} from '@/app/data/selfAssesmentForms';
import { IScoringInfo } from '@/app/types/documents';
import { useState } from 'react';
import { HiDownload, HiEye, HiInformationCircle } from 'react-icons/hi';

const Modal = ({
  info,
  onClose,
}: {
  info: IScoringInfo;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h4 className="text-xl font-semibold text-primary-dark mb-4">
          {info.title}
        </h4>
        <ul className="flex flex-col gap-2 mb-6">
          {info.content.map((item: string, index: number) => (
            <li key={index} className="text-primary-medium">
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="w-full bg-secondary-medium hover:bg-secondary-dark text-white py-2 px-4 rounded transition-colors"
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
    <section className="container max-w-5xl mx-auto p-6 bg-beige min-h-screen">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-primary-dark mb-4">Dokument</h2>
        <p>Här kan du ladda ner formulär för självskattning och information</p>
      </div>

      {/* Guide Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-12">
        <h3 className="text-xl font-semibold text-primary-dark mb-4">
          Guide för att leva med bipolär sjukdom
        </h3>
        <p className="text-primary-dark mb-6 font-semibold text-sm">
          En omfattande guide som hjälper dig att hantera vardagen med bipolär
          sjukdom. Guiden innehåller praktiska råd om:
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <ul className="list-disc list-inside text-primary-dark flex flex-col gap-2 text-sm">
            <li>Igenkänning av tidiga varningstecken</li>
            <li>
              Strategier för att hantera både maniska och depressiva episoder
            </li>
            <li>Tips för bättre sömnrutiner och stresshantering</li>
          </ul>
          <ul className="list-disc list-inside text-primary-dark flex flex-col gap-2 text-sm">
            <li>Råd om medicinering och behandling</li>
            <li>Information för anhöriga</li>
            <li>Kontaktinformation till vårdresurser</li>
          </ul>
        </div>
        <div className="flex gap-4">
          <a
            href="../pdfs/guide.pdf"
            download="guide.pdf"
            className="flex-1 flex items-center justify-center gap-2 bg-secondary-medium hover:bg-secondary-dark text-white py-2 px-4 rounded transition-colors"
          >
            <HiDownload className="text-xl" />
            <span>Ladda ner</span>
          </a>
          <a
            href="../pdfs/guide.pdf"
            target="_blank"
            className="flex-1 flex items-center justify-center gap-2 border border-secondary-medium text-secondary-medium hover:bg-secondary-light py-2 px-4 rounded transition-colors"
          >
            <HiEye className="text-xl" />
            <span>Visa guide</span>
          </a>
        </div>
      </div>

      {/* Forms Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-primary-dark mb-4">
          Formulär för självskattning
        </h3>
        <p className="text-xs text-secondary-medium italic mb-6">
          Klicka på &quot;Poängsystem&quot; för att se hur formulären ska tolkas
        </p>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
          {selfAssessmentForms.map((form, index) => (
            <div
              key={index}
              className="flex flex-col h-full border-b border-secondary-light pb-6"
            >
              <div className="flex items-start justify-between mb-2 gap-4">
                <p className="text-primary-medium font-semibold">
                  {form.title}
                </p>
                {form.scoringId && (
                  <button
                    onClick={() => setActiveModal(form.scoringId)}
                    className="flex-shrink-0 flex items-center gap-2 text-secondary-medium hover:text-secondary-dark transition-colors px-3 py-1 rounded-full border border-secondary-light hover:border-secondary-medium"
                    title="Visa poängsystem"
                  >
                    <HiInformationCircle className="text-xl" />
                    <span className="text-sm">Poängsystem</span>
                  </button>
                )}
              </div>
              <p className="text-primary-dark text-sm mb-6 flex-grow">
                {form.description}
              </p>
              <div className="flex gap-4 mt-auto">
                <a
                  href={form.href}
                  download
                  className="flex-1 flex items-center justify-center gap-2 bg-secondary-medium hover:bg-secondary-dark text-white py-2 px-4 rounded transition-colors"
                  aria-label={form.ariaLabel}
                >
                  <HiDownload className="text-xl" />
                  <span>Ladda ner</span>
                </a>
                <a
                  href={form.href}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 border border-secondary-medium text-secondary-medium hover:bg-secondary-light py-2 px-4 rounded transition-colors"
                >
                  <HiEye className="text-xl" />
                  <span>Visa formulär</span>
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
