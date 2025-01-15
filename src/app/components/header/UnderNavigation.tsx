'use client';

import { ICustomSession } from '@/app/types/authoptions';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import menu from '../../data/menu.json';
import BipolarLogo from '../logo/BipolarLogo';
import MenuItem from './MenuItem';

const UnderNavigation = () => {
  const { data: session } = useSession() as { data: ICustomSession | null };

  return (
    <nav className="w-full flex justify-between items-center gap-10 max-w-[1440px] px-6 lg:px-8 text-secondary-dark font-semibold">
      <BipolarLogo />
      <div className="flex gap-10">
        {menu.menuItems.map((menuItem) => {
          return (
            <div key={menuItem.id} className="flex gap-2">
              <MenuItem menuItem={menuItem} />
            </div>
          );
        })}
        {session && (
          <Link href="/min-sida" className="font-medium text-lg">
            Min Sida
          </Link>
        )}
      </div>
    </nav>
  );
};

export default UnderNavigation;
