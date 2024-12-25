'use client';

import { usePathname } from 'next/navigation';
import NotFoundPage from '../pages/NotFoundPage';
import MultimediaPage from '../pages/resources/MultimediaPage';
import ArticlesPage from '../pages/resources/ArticlesPage';
import ToolsPage from '../pages/resources/ToolsPage';

const ResourcesLayout = () => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const renderResourcesPage = () => {
    switch (slug) {
      case 'multimedia':
        return <MultimediaPage />;
      case 'artiklar':
        return <ArticlesPage />;
      case 'verktyg':
        return <ToolsPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return <div>{renderResourcesPage()}</div>;
};

export default ResourcesLayout;
