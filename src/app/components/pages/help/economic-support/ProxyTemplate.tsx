'use client';

import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import ListWithLeftBorder from '@/app/components/shared/lists/ListWithLeftBorder';
import {
  PROXY_TEMPLATE_LIST_ITEMS,
  PROXY_TEMPLATE_TEXT,
} from '@/app/data/help/economic';
import { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import ProxyDownloadButtons from './ProxyDownloadButtons';
import ProxyPreview from './ProxyPreview';
import ProxyPreviewButton from './ProxyPreviewButton';

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
    <div className="content-container">
      <SectionTitle icon={<FaFileAlt />}>Mall för fullmakt</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <p>
            Här kan du ladda ner en mall för en enkel fullmakt som du kan
            anpassa efter dina behov. Kom ihåg att kontrollera med din bank vad
            som krävs specifikt.
          </p>
          <ListWithLeftBorder list={PROXY_TEMPLATE_LIST_ITEMS} />
          <ProxyDownloadButtons handleProxyDownload={handleProxyDownload} />
        </div>
        <div className="flex flex-col gap-4 sm:items-center">
          <ProxyPreviewButton
            showPreview={showPreview}
            handleClickOnPreviewButton={handleClickOnPreviewButton}
          />
          <ProxyPreview showPreview={showPreview} />
        </div>
      </div>
    </div>
  );
};

export default ProxyTemplate;
