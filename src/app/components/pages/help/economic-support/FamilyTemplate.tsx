'use client';

import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import { FAMILY_PLAN_TEMPLATE_TEXT } from '@/app/data/help/economic';
import { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import TemplateDownloadButtons from './TemplateDownloadButtons';
import TemplatePreview from './TemplatePreview';
import TemplatePreviewButton from './TemplatePreviewButton';

const FamilyTemplate = () => {
  const [showPreview, setShowPreview] = useState(false);

  const handleClickOnPreviewButton = () => {
    setShowPreview(!showPreview);
  };

  const handleFamilyPlanDownload = (format: 'txt' | 'pdf' | 'docx') => {
    let url: string;
    let filename: string;

    switch (format) {
      case 'txt':
        const blob = new Blob([FAMILY_PLAN_TEMPLATE_TEXT], {
          type: 'text/plain',
        });
        url = window.URL.createObjectURL(blob);
        filename = 'familjeplan-mall.txt';
        break;
      case 'pdf':
        url = '/pdfs/familjeplan-mall.pdf';
        filename = 'familjeplan-mall.pdf';
        break;
      case 'docx':
        url = '/word/familjeplan-mall.docx';
        filename = 'familjeplan-mall.docx';
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
      <SectionTitle icon={<FaFileAlt />}> Mall för familjeplan</SectionTitle>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-6">
        <p className="flex-1">
          Här kan du ladda ner en mall för en familjeplan som du kan anpassa
          efter dina behov. Denna plan hjälper dig och dina anhöriga att
          förbereda för ekonomiska utmaningar vid skov.
        </p>
        <div className="flex flex-1 md:justify-center">
          <TemplateDownloadButtons handleDownload={handleFamilyPlanDownload} />
        </div>
      </div>
      <div className={`flex flex-col ${showPreview ? 'gap-4' : 'gap-0'}`}>
        <TemplatePreviewButton
          showPreview={showPreview}
          handleClick={handleClickOnPreviewButton}
        />
        <TemplatePreview
          templateText={FAMILY_PLAN_TEMPLATE_TEXT}
          showPreview={showPreview}
        />
      </div>
    </div>
  );
};

export default FamilyTemplate;
