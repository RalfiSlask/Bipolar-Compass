'use client';

import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';
import SubmenuItem from './SubmenuItem';

interface SubmenuItemProps {
  id: number;
  title: string;
  slug: string;
}

interface IMenuItemProps {
  menuItem: {
    id: number;
    title: string;
    slug: string;
    image?: string;
    submenuItems: SubmenuItemProps[];
  };
  closeMenu: () => void;
  isMobile: boolean;
  activeMenu: string | null;
  setActiveMenu: (slug: string | null) => void;
}

const MenuItem = ({
  menuItem,
  closeMenu,
  isMobile,
  activeMenu,
  setActiveMenu,
}: IMenuItemProps) => {
  const { title, submenuItems, slug } = menuItem;
  const hasSubmenuitems = submenuItems.length > 0;
  const isVisible = activeMenu === slug;

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubmenuitems) {
      e.preventDefault();
      e.stopPropagation();
      setActiveMenu(isVisible ? null : slug);
    } else {
      closeMenu();
      setActiveMenu(null);
    }
  };

  return (
    <div className="w-full sm:max-w-[300px] xl:w-auto lg:min-w-[300px] xl:max-w-[150px] xl:min-w-0">
      <Link
        href={`/${slug}`}
        className={`
          nav-link !text-base gap-1 xl:!text-lg flex items-center justify-between
          w-full xl:w-auto px-3 py-2 rounded-lg transition-all duration-200
          hover:bg-primary-light hover:text-primary-dark min-h-[48px]
          ${isVisible ? 'bg-primary-light text-primary-dark' : ''}
          cursor-pointer touch-manipulation
        `}
        onClick={handleClick}
      >
        <span className="lg:text-xl xl:text-base">{title}</span>
        {hasSubmenuitems && (
          <IoIosArrowDown
            className={`min-w-5 min-h-5 w-5 h-5 transition-transform duration-200 flex-shrink-0 ${
              isVisible ? 'rotate-180' : ''
            }`}
            aria-hidden={true}
          />
        )}
      </Link>

      {isMobile && hasSubmenuitems && (
        <nav
          className={`
            pl-4 mt-1 transition-all duration-300 ease-in-out
            ${
              isVisible
                ? 'max-h-[1000px] opacity-100 visible'
                : 'max-h-0 opacity-0 invisible overflow-hidden'
            }
          `}
        >
          {submenuItems.map((submenuItem) => (
            <SubmenuItem
              key={submenuItem.id}
              title={submenuItem.title}
              route={`/${slug}/${submenuItem.slug}`}
              isMobile={true}
              onNavigate={closeMenu}
            />
          ))}
        </nav>
      )}
    </div>
  );
};

export default MenuItem;
