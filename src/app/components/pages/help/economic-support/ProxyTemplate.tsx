'use client';

import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import { PROXY_TEMPLATE_TEXT } from '@/app/data/help/economic';
import { useState } from 'react';
import {
  FaEye,
  FaEyeSlash,
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
} from 'react-icons/fa';

const ProxyTemplate = () => {
  const handleDownload = (format: 'txt' | 'pdf' | 'docx') => {
    let url: string;
    let filename: string;

    switch (format) {
      case 'txt':
        const blob = new Blob([PROXY_TEMPLATE_TEXT], { type: 'text/plain' });
        url = window.URL.createObjectURL(blob);
        filename = 'fullmakt-mall.txt';
        break;
      case 'pdf':
        url = '/pdfs/fullmakt-mall.pdf';
        filename = 'fullmakt-mall.pdf';
        break;
      case 'docx':
        url = '/word/fullmakt-mall.docx';
        filename = 'fullmakt-mall.docx';
        break;
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    if (format === 'txt') {
      window.URL.revokeObjectURL(url);
    }

    document.body.removeChild(a);
  };

  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="content-container">
      <SectionTitle icon={<FaFileAlt />}>Mall för fullmakt</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <p className="">
            Här kan du ladda ner en mall för en enkel fullmakt som du kan
            anpassa efter dina behov. Kom ihåg att kontrollera med din bank vad
            som krävs specifikt.
          </p>

          <div className="bg-primary-light border-l-4 border-primary-dark p-4 text-primary-dark">
            <h4 className="font-semibold mb-2 text-xl">Viktiga punkter:</h4>
            <ul className="text-sm flex flex-col gap-1 list-disc list-inside">
              <li>Skriv under för hand för giltighet</li>
              <li>Ta med legitimation vid inlämning</li>
              <li>Du kan när som helst återkalla fullmakten</li>
              <li>Kontrollera med din bank vad som krävs</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-lg">Välj format:</h4>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleDownload('txt')}
                className="flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-primary-darker transition-colors"
              >
                <FaFileAlt />
                TXT
              </button>
              <button
                onClick={() => handleDownload('pdf')}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaFilePdf />
                PDF
              </button>
              <button
                onClick={() => handleDownload('docx')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaFileWord />
                Word
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:items-center">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="primary-button flex items-center gap-2"
          >
            {showPreview ? (
              <>
                <FaEyeSlash className="text-lg" />
                Dölj förhandsvisning
              </>
            ) : (
              <>
                <FaEye className="text-lg" />
                Visa förhandsvisning
              </>
            )}
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showPreview ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {showPreview && (
              <div className="flex flex-col gap-4 pt-4">
                <h3 className="text-xl font-semibold text-primary-dark">
                  Förhandsvisning av mallen
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-primary-border shadow-sm">
                  <pre className="text-sm whitespace-pre-wrap font-mono text-primary-dark leading-relaxed">
                    {PROXY_TEMPLATE_TEXT}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProxyTemplate;
