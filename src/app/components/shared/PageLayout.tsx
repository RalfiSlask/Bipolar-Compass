import { IPageLayoutData } from '../../types/pageLayouts';
import MainPageImageGrid from './MainPageImageGrid';

interface IMainLinkPageLayoutProps {
  pageInfo: IPageLayoutData;
}

const MainLinkPageLayout = ({ pageInfo }: IMainLinkPageLayoutProps) => {
  const { title, description, subDescription, links } = pageInfo;

  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-16 sm:pb-24">
        <div className="mb-8 sm:mb-20 text-left">
          <h2 className="text-5xl md:text-6xl text-center font-bold text-primary-dark mb-8 animate-fade-in">
            {title}
          </h2>
          <div className="flex flex-col gap-4 justify-center bg-primary-light max-w-4xl mx-auto p-4 rounded-lg">
            <p className="text-secondary-dark">{description}</p>
            {subDescription && (
              <p className="text-secondary-dark font-semibold">
                {subDescription}
              </p>
            )}
          </div>
        </div>

        <nav className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {links.map((item) => (
            <MainPageImageGrid key={item.href} item={item} />
          ))}
        </nav>
      </div>
    </section>
  );
};

export default MainLinkPageLayout;
