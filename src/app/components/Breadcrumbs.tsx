'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import arrowRightIcon from '../assets/icons/arrow-right.svg';
import menuData from '../data/menu.json';
import { IMenuItem } from '../types/menu/menu';

const findBreadcrumbs = (pathname: string, menu: IMenuItem[]): IMenuItem[] => {
  const breadcrumbs: IMenuItem[] = [
    {
      id: 0,
      title: 'Hem',
      slug: '/',
      submenuItems: [],
    },
  ];

  const segments = pathname.split('/').filter(Boolean);
  let currentMenu: IMenuItem[] = menu;

  for (const segment of segments) {
    const match = currentMenu.find((item) => item.slug === segment);

    if (match) {
      breadcrumbs.push(match);
      currentMenu = match.submenuItems || [];
    } else {
      console.warn(`No match found for segment: ${segment}`);
      break;
    }
  }
  return breadcrumbs;
};
const Breadcrumbs = () => {
  const pathname = usePathname();

  if (
    pathname === '/' ||
    pathname.includes('/min-sida') ||
    pathname.includes('/akut') || pathname.includes('/konto')
  ) {
    return null;
  }

  const breadcrumbs = findBreadcrumbs(pathname, menuData.menuItems);

  return (
    <nav className="py-6" aria-label="Breadcrumb">
      <ol className="flex">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={breadcrumb.id} className="flex items-center">
              {!isLast ? (
                <Link href={breadcrumb.slug} className="font-bold">
                  {breadcrumb.title}
                </Link>
              ) : (
                <span className="">{breadcrumb.title}</span>
              )}
              {!isLast && (
                <span className="mx-1">
                  <Image
                    src={arrowRightIcon}
                    alt="navigation pil höger"
                    width={16}
                    height={16}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
