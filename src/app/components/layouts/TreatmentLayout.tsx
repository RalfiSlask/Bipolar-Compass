'use client';

import { usePathname } from 'next/navigation';
import MedicinePage from '../pages/treatment/MedicinePage';
import SelfHelpPage from '../pages/treatment/SelfHelpPage';
import TherapyPage from '../pages/treatment/TheraphyPage';
import NotFoundPage from '../pages/NotFoundPage';
import CrisisPlanPage from '../pages/treatment/CrisisPlanPage';

const TreatmentLayout = () => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const renderTreatmentPage = () => {
    switch (slug) {
      case 'medicin':
        return <MedicinePage />;
      case 'sjalvhjalp':
        return <SelfHelpPage />;
      case 'terapi':
        return <TherapyPage />;
      case 'krisplan':
        return <CrisisPlanPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return <div>{renderTreatmentPage()}</div>;
};

export default TreatmentLayout;
