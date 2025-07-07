'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import arrowRightIcon from '../assets/icons/arrow-right.svg';
import menuData from '../data/json/menu.json';
import { IMenuItem } from '../types/menu/menu';

const findBreadcrumbs = (
  pathname: string,
  menu: IMenuItem[],
  searchParams: URLSearchParams | null
): IMenuItem[] => {
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
  let currentPath = '';

  // This loop is used to find the breadcrumbs based on the pathname.
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const match = currentMenu.find((item) => item.slug === segment);

    // If a match is found, the match is added to the breadcrumbs array and the currentMenu is updated to the submenuItems of the match.
    if (match) {
      breadcrumbs.push({
        ...match,
        slug: currentPath, // Override the slug with the full path
      });
      currentMenu = match.submenuItems || [];
    } else {
      if (pathname.includes('/multimedia/bocker/')) {
        const bockerMatch = currentMenu.find((item) => item.slug === 'bocker');
        if (bockerMatch) {
          breadcrumbs.push({
            ...bockerMatch,
            slug: '/multimedia/bocker', // Set the full path for böcker
          });
        }

        if (segments.length >= 3) {
          const originalTitle = searchParams?.get('title') || segment;
          breadcrumbs.push({
            id: -1,
            title: originalTitle,
            slug: pathname,
            submenuItems: [],
          });
        }
      }
      break;
    }
  }
  return breadcrumbs;
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (
    pathname === '/' ||
    pathname?.includes('/min-sida') ||
    pathname?.includes('/akut') ||
    pathname?.includes('/konto')
  ) {
    return null;
  }

  let breadcrumbs;
  if (pathname !== null) {
    breadcrumbs = findBreadcrumbs(pathname, menuData.menuItems, searchParams);
  }

  return (
    <nav
      className="py-4 bg-primary-light flex justify-center border-b"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap max-w-[1440px] px-4 md:px-10 w-full items-center text-primary-dark">
        {breadcrumbs?.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={breadcrumb.id} className="flex items-center ">
              {!isLast ? (
                <Link
                  href={breadcrumb.slug}
                  className="font-bold relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary-dark after:transition-all after:duration-300 hover:after:w-full"
                >
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
