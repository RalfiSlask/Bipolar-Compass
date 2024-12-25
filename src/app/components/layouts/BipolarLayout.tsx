'use client';

import { usePathname } from 'next/navigation';
import NotFoundPage from '../pages/NotFoundPage';
import DiagnosesPage from '../pages/bipolar/DiagnosesPage';
import RelativesPage from '../pages/bipolar/RelativesPage';
import SymptomsPage from '../pages/bipolar/SymptomsPage';
import WhatIsBipolarPage from '../pages/bipolar/WhatIsBipolarPage';
import FaqPage from '../pages/bipolar/FaqPage';

const BipolarLayout = () => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const renderBipolarPage = () => {
    switch (slug) {
      case 'diagnoser':
        return <DiagnosesPage />;
      case 'anhoriga':
        return <RelativesPage />;
      case 'symptom':
        return <SymptomsPage />;
      case 'vad-ar-bipolaritet':
        return <WhatIsBipolarPage />;
      case 'vanliga-fragor':
        return <FaqPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return <div>{renderBipolarPage()}</div>;
};

export default BipolarLayout;
