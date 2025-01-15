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
}

const MenuItem = ({ menuItem }: IMenuItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { title, submenuItems, slug } = menuItem;

  const hasSubmenuitems = menuItem.submenuItems.length > 0;

  const toggleMenu = (state: boolean) => setIsVisible(state);

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

  return (
    <div
      className="relative flex cursor-pointer"
      onMouseEnter={() => toggleMenu(true)}
      onMouseLeave={() => toggleMenu(false)}
      ref={menuRef}
    >
      <Link
        href={`/${slug}`}
        passHref
        className="text-lg flex items-center gap-2 "
        aria-haspopup="menu"
        aria-expanded={isVisible}
        aria-controls={`submenu-${slug}`}
        onFocus={() => toggleMenu(true)}
        onBlur={handleBlur}
      >
        {title}
        {hasSubmenuitems && (
          <Image
            src={Arrow}
            width={14}
            height={14}
            alt="Öppna undermeny"
            aria-hidden={!hasSubmenuitems}
          />
        )}
      </Link>
      {isVisible && hasSubmenuitems && (
        <div
          role="menu"
          id={`submenu-${slug}`}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="absolute flex flex-col gap-2 top-full bg-white border border-gray-300 shadow-lg z-10 p-4"
        >
          {submenuItems.map((submenuItem) => {
            const { id, title, slug: submenuSlug } = submenuItem;
            return (
              <SubmenuItem
                key={id}
                title={title}
                route={`/${slug}/${submenuSlug}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
