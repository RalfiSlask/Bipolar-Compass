'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Arrow from '../../assets/icons/arrow-down.svg';
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
    submenuItems: SubmenuItemProps[];
  };
  closeMainMenu: () => void;
}

const MenuItem = ({ menuItem, closeMainMenu }: IMenuItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { title, submenuItems, slug } = menuItem;

  const hasSubmenuitems = menuItem.submenuItems.length > 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsVisible(false);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.relatedTarget)) {
      setIsVisible(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubmenuitems) {
      e.preventDefault();
      setIsVisible(!isVisible);
    } else {
      closeMainMenu();
    }
  };

  return (
    <div className="relative flex flex-col w-full xl:w-auto" ref={menuRef}>
      <Link
        href={`/${slug}`}
        passHref
        className={`
          !text-base xl:!text-lg flex items-center justify-between
          hover:text-primary-medium transition-colors w-full xl:w-auto
          p-3 rounded-lg gap-2
          ${isVisible ? 'bg-primary-light text-primary-dark' : ''}
        `}
        aria-haspopup="menu"
        aria-expanded={isVisible}
        aria-controls={`submenu-${slug}`}
        onBlur={handleBlur}
        onClick={handleClick}
      >
        {title}
        {hasSubmenuitems && (
          <Image
            src={Arrow}
            width={14}
            height={14}
            alt="Öppna undermeny"
            aria-hidden={!hasSubmenuitems}
            className={`transition-transform duration-200 ${
              isVisible ? 'rotate-180' : ''
            }`}
          />
        )}
      </Link>
      {hasSubmenuitems && (
        <div
          role="menu"
          id={`submenu-${slug}`}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`
            xl:absolute xl:w-48 w-full flex flex-col
            xl:top-full bg-white xl:border xl:border-primary-border 
            xl:shadow-lg z-10 xl:p-4 xl:rounded-lg
            ${isVisible ? 'block' : 'hidden'}
            ${window.innerWidth < 1280 ? 'mt-1' : ''}
          `}
        >
          {submenuItems.map((submenuItem) => {
            const { id, title, slug: submenuSlug } = submenuItem;
            return (
              <SubmenuItem
                key={id}
                title={title}
                route={`/${slug}/${submenuSlug}`}
                isMobile={window.innerWidth < 1280}
                onNavigate={closeMainMenu}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
