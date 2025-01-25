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
    <div className="w-full xl:w-auto ">
      <Link
        href={`/${slug}`}
        className={`
          nav-link !text-base xl:!text-lg flex items-center gap-1
          w-full xl:w-auto px-3 py-2 rounded-lg transition-all duration-200
          hover:bg-primary-light hover:text-primary-dark h-[48px]
          ${isVisible ? 'bg-primary-light text-primary-dark' : ''}
        `}
        onClick={handleClick}
      >
        {title}
        {hasSubmenuitems && (
          <IoIosArrowDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isVisible ? 'rotate-180' : ''
            }`}
            aria-hidden={true}
          />
        )}
      </Link>

      {isMobile && hasSubmenuitems && (
        <div
          className={`
            pl-4 mt-1 transition-all duration-300 ease-in-out
            ${
              isVisible
                ? 'max-h-[500px] opacity-100 visible'
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
        </div>
      )}
    </div>
  );
};

export default MenuItem;
