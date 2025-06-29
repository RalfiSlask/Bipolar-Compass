'use client';

import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import { PROXY_TEMPLATE_TEXT } from '@/app/data/help/economic';
import { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import TemplateDownloadButtons from './TemplateDownloadButtons';
import TemplatePreview from './TemplatePreview';
import TemplatePreviewButton from './TemplatePreviewButton';

const ProxyTemplate = () => {
  const [showPreview, setShowPreview] = useState(false);

  const handleClickOnPreviewButton = () => {
    setShowPreview(!showPreview);
  };

  const handleProxyDownload = (format: 'txt' | 'pdf' | 'docx') => {
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

    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.download = filename;
    document.body.appendChild(linkElement);
    linkElement.click();

    if (format === 'txt') {
      window.URL.revokeObjectURL(url);
    }

    document.body.removeChild(linkElement);
  };

  return (
    <div className="content-container lightest-list-container">
      <SectionTitle icon={<FaFileAlt />}>Mall för fullmakt</SectionTitle>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-6">
        <p className="flex-1">
          Här kan du ladda ner en mall för en enkel fullmakt som du kan anpassa
          efter dina behov. Kom ihåg att kontrollera med din bank vad som krävs
          specifikt. Kontrollera med din bank vad som krävs specifikt. Kom ihåg
          att du när som helst kan återkalla fullmakten.
        </p>
        <div className="flex flex-1 md:justify-center">
          <TemplateDownloadButtons handleDownload={handleProxyDownload} />
        </div>
      </div>
      <div className={`flex flex-col ${showPreview ? 'gap-4' : 'gap-0'}`}>
        <TemplatePreviewButton
          showPreview={showPreview}
          handleClick={handleClickOnPreviewButton}
        />
        <TemplatePreview
          templateText={PROXY_TEMPLATE_TEXT}
          showPreview={showPreview}
        />
      </div>
    </div>
  );
};

export default ProxyTemplate;
