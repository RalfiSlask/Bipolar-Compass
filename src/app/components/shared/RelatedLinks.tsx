import { IRelatedLinksInfo } from '@/app/types/related';
import Link from 'next/link';

interface IRelatedLinksProps {
  linksInfo: IRelatedLinksInfo;
  currentPage: string;
}

const RelatedLinks = ({ linksInfo, currentPage }: IRelatedLinksProps) => {
  const filteredLinks = linksInfo.links.filter(
    (link) => link.id !== currentPage
  );
  const colCount = Math.min(
    filteredLinks.length,
    3
  ); /* If there are more than 3 links, the grid will still be 3 columns */
  const gridClass = `grid grid-cols-1 sm:grid-cols-${colCount} gap-6 max-w-5xl mx-auto w-full list-none`;

  return (
    <div className="flex flex-col gap-6 border-t border-primary-light/30 pt-10">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="h-xs lg:text-2xl text-primary-dark mb-3">
          {linksInfo.title}
        </h2>
        <p className="text-primary-dark/80 mb-6">{linksInfo.description}</p>
      </div>
      <nav className={gridClass}>
        {filteredLinks.map((link) => (
          <li className="group related-container" key={link.id}>
            <Link href={link.href} aria-label={link.ariaLabel}>
              <span
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 block"
                aria-hidden="true"
              >
                {link.icon}
              </span>
              <span className="font-semibold text-lg">{link.label}</span>
            </Link>
          </li>
        ))}
      </nav>
    </div>
  );
};

export default RelatedLinks;
