'use client';

import { usePathname } from 'next/navigation';
import LatestPage from '../pages/science/LatestPage';
import NotFoundPage from '../pages/NotFoundPage';
import CaretakersPage from '../pages/science/CaretakersPage';
import ReportsPage from '../pages/science/ReportsPage';

const ScienceLayout = () => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const renderSciencePage = () => {
    switch (slug) {
      case 'senaste':
        return <LatestPage />;
      case 'vardgivare':
        return <CaretakersPage />;
      case 'rapporter':
        return <ReportsPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return <div>{renderSciencePage()}</div>;
};

export default ScienceLayout;
