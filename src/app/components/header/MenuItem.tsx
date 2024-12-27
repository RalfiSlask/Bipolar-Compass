'use client';

import { useState } from 'react';
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
  const { title, submenuItems, slug } = menuItem;

  return (
    <div
      className="relative flex cursor-pointer"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <h2>{title}</h2>
      {isVisible && (
        <div className="absolute flex flex-col gap-2 top-full bg-white border border-gray-300 shadow-lg z-10 p-4">
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
