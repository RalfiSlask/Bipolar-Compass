'use client';

import { usePathname } from 'next/navigation';
import ContactPage from '../pages/about/ContactPage';
import CookiesPage from '../pages/about/CookiesPage';
import GdprPage from '../pages/about/GdprPage';
import VisionPage from '../pages/about/VisionPage';
import NotFoundPage from '../pages/NotFoundPage';

const AboutLayout = () => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const renderAboutPage = () => {
    switch (slug) {
      case 'vision':
        return <VisionPage />;
      case 'kontakt':
        return <ContactPage />;
      case 'cookies':
        return <CookiesPage />;
      case 'gdpr':
        return <GdprPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return <div>{renderAboutPage()}</div>;
};

export default AboutLayout;
