'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { MdContactSupport, MdEmergency } from 'react-icons/md';
import menu from '../../data/json/menu.json';
import BipolarLogo from '../logo/BipolarLogo';
import Lightbox from './Lightbox';
import LoginNavigation from './LoginNavigation';
import MenuItem from './MenuItem';
import SubmenuItem from './SubmenuItem';

interface IUnderNavigationProps {
  toggleMenuOpen: () => void;
  closeMenu: () => void;
  setActiveMenu: (value: SetStateAction<string | null>) => void;
  resetMenu: () => void;
  isMenuOpen: boolean;
  isMobile: boolean;
  activeMenu: string | null;
}

const UnderNavigation = ({
  toggleMenuOpen,
  closeMenu,
  setActiveMenu,
  resetMenu,
  isMobile,
  activeMenu,
  isMenuOpen,
}: IUnderNavigationProps) => {
  const [mounted, setMounted] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      // Prevent body scrolling without moving content
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      // Restore scrolling
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  if (!mounted) return null;

  // Render mobile menu header
  const renderMobileMenuHeader = () => (
    <>
      <div className="xl:hidden flex justify-between items-center w-full h-[94px] flex-shrink-0">
        <div className="absolute top-[94px] left-0 w-full h-[2px] bg-primary-medium" />
        <BipolarLogo />
        <button
          className="xl:hidden text-2xl hover:text-primary-medium transition-colors z-[9999]"
          onClick={toggleMenuOpen}
          aria-label="Toggle menu"
        >
          <HiX />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row px-3 w-full xl:hidden justify-between gap-4 lg:gap-2 border-b border-primary-light pt-4 lg:pt-0 pb-4 mb-2 lg:mb-10 xl:mb-2 flex-shrink-0">
        <div className="flex items-center gap-6 xl:px-2">
          <Link
            href="/akut"
            className="font-semibold text-base flex items-center gap-2 text-primary-dark"
            onClick={closeMenu}
          >
            <MdEmergency /> Akut hjälp
          </Link>
          <Link
            href="/kontakt"
            className="font-semibold text-base flex items-center gap-2 text-primary-dark"
            onClick={closeMenu}
          >
            <MdContactSupport /> Kontakt
          </Link>
        </div>
        <div className="xl:hidden flex items-center">
          <LoginNavigation closeMenu={closeMenu} />
        </div>
      </div>
    </>
  );

  // Render desktop dropdown menu
  const renderDesktopDropdown = () => {
    if (isMobile || !activeMenu) return null;

    const activeMenuItem = menu.menuItems.find(
      (item) => item.slug === activeMenu
    );
    if (!activeMenuItem) return null;

    return (
      <>
        <Lightbox onClose={() => setActiveMenu(null)} />
        <div className="w-full bg-white absolute left-0 right-0 shadow-lg transition-all duration-300 ease-in-out opacity-100 border-t border-primary-border animate-modal-slide-up top-[160px] z-[51]">
          <div className="p-12 max-w-[1440px] mx-auto h-[440px]">
            <div className="max-w-5xl mx-auto">
              <Link
                href={`/${activeMenuItem.slug}`}
                onClick={resetMenu}
                className="group flex items-center gap-3 text-3xl text-primary-dark font-semibold mb-8 hover:text-primary-medium transition-colors"
              >
                {activeMenuItem.title}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </Link>

              <div className="flex gap-16">
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                    {activeMenuItem.submenuItems.map((submenuItem) => (
                      <div key={submenuItem.id}>
                        <SubmenuItem
                          title={submenuItem.title}
                          route={`/${activeMenuItem.slug}/${submenuItem.slug}`}
                          isMobile={false}
                          onNavigate={resetMenu}
                        />
                        <div className="h-[1px] bg-primary-light border-b border-primary-dark/10 mt-3" />
                      </div>
                    ))}
                  </div>
                </div>

                {activeMenuItem.image && (
                  <div className="relative w-[400px] aspect-[450/338] max-h-[260px]">
                    <Image
                      src={activeMenuItem.image}
                      alt={`${activeMenuItem.title} image`}
                      quality={80}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px, 400px"
                      className="w-full h-auto object-cover rounded-xl shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <nav className="w-full flex justify-between items-center max-w-[1440px] px-4 sm:px-6 xl:px-8 text-secondary-dark font-semibold h-full">
      <BipolarLogo />

      {/* Mobile menu toggle button */}
      <button
        className={`xl:hidden text-2xl hover:text-primary-medium transition-colors z-[9999] ${
          isMenuOpen ? 'hidden' : ''
        }`}
        onClick={toggleMenuOpen}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Menu container - mobile or desktop */}
      <div
        ref={menuContainerRef}
        className={`
          flex flex-col xl:flex-row gap-1 lg:gap-4 xl:gap-2 lg:items-center xl:min-w-[910px] xl:max-w-[910px]
          ${
            isMenuOpen
              ? 'fixed xl:relative left-0 top-0 w-full h-screen items-start bg-white pb-4 px-4 shadow-lg z-[9999] overflow-y-auto touch-pan-y'
              : 'hidden xl:flex'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile menu header with logo and links */}
        {isMenuOpen && renderMobileMenuHeader()}

        {/* Menu items with extra padding at bottom to ensure scrollability */}
        <div className="w-full pb-24 xl:pb-0 xl:flex lg:justify-between">
          {menu.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem.id}
              menuItem={menuItem}
              closeMenu={closeMenu}
              isMobile={isMobile}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          ))}
        </div>
      </div>

      {/* Desktop dropdown menu */}
      {renderDesktopDropdown()}
    </nav>
  );
};

export default UnderNavigation;
