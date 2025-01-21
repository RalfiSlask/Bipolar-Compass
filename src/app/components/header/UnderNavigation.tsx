'use client';

import { ICustomSession } from '@/app/types/authoptions';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import menu from '../../data/menu.json';
import BipolarLogo from '../logo/BipolarLogo';
import MenuItem from './MenuItem';

const MOBILE_BREAKPOINT = 1280;

const UnderNavigation = () => {
  const { data: session } = useSession() as { data: ICustomSession | null };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();

    const handleResize = () => {
      checkMobile();
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full flex justify-between items-center gap-10 max-w-[1440px] px-6 xl:px-8 text-secondary-dark font-semibold py-4 relative">
      <BipolarLogo />
      <button
        className="xl:hidden text-2xl hover:text-primary-medium transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      <div
        className={`
          flex flex-col xl:flex-row gap-2 xl:gap-4 items-start xl:items-center
          ${
            isMenuOpen
              ? 'absolute top-[100%] left-0 w-full bg-white p-4 shadow-lg z-50 border-t border-primary-medium'
              : 'hidden xl:flex'
          }
        `}
      >
        {menu.menuItems.map((menuItem) => (
          <MenuItem
            key={menuItem.id}
            menuItem={menuItem}
            closeMenu={closeMenu}
            isMobile={isMobile}
          />
        ))}
        {session && (
          <Link
            href="/min-sida"
            className="p-3 font-semibold text-base xl:text-lg hover:text-primary-medium transition-colors w-full xl:w-auto"
          >
            Min Sida
          </Link>
        )}
      </div>
    </nav>
  );
};

export default UnderNavigation;
