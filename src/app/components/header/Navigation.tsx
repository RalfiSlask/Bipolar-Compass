'use client';

import { ICustomSession } from '@/app/types/authoptions';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import menu from '../../data/menu.json';
import BipolarLogo from '../logo/BipolarLogo';
import LoginNavigation from './LoginNavigation';
import MenuItem from './MenuItem';

const Navigation = () => {
  const { data: session } = useSession() as { data: ICustomSession | null };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-12">
        <BipolarLogo />
        <nav className="hidden md:flex items-center gap-8">
          {menu.menuItems.map((menuItem) => (
            <MenuItem key={menuItem.id} menuItem={menuItem} />
          ))}
          {session && (
            <Link
              href="/min-sida"
              className="text-white hover:text-tertiary-light transition-colors"
            >
              Min Sida
            </Link>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <LoginNavigation />
        <Link
          className="bg-quaternary-dark hover:bg-quaternary-medium text-white px-4 py-2 rounded-md transition-colors"
          href="/akut"
        >
          Akut hjälp
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
