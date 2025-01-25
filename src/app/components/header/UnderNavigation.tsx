'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { MdContactSupport, MdEmergency } from 'react-icons/md';
import menu from '../../data/json/menu.json';
import BipolarLogo from '../logo/BipolarLogo';
import Lightbox from './Lightbox';
import LoginNavigation from './LoginNavigation';
import MenuItem from './MenuItem';
import SubmenuItem from './SubmenuItem';

const MOBILE_BREAKPOINT = 1280;

const UnderNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen, isMobile]);

  return (
    <nav className="w-full flex justify-between items-center gap-10 max-w-[1440px] px-6 xl:px-8 text-secondary-dark font-semibold py-4">
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
        flex flex-col xl:flex-row gap-2 xl:gap-3 lg:items-center
        ${
          isMenuOpen
            ? 'absolute top-[96px] left-0 w-full h-[calc(100vh-96px)] items-start  bg-white p-4 shadow-lg z-50 border-t border-primary-medium overflow-y-auto'
            : 'hidden xl:flex'
        }`}
      >
        <div className="flex flex-col w-full xl:hidden gap-2 border-b border-primary-light pb-4 mb-2">
          <Link
            href="/akut"
            className="p-3 font-semibold text-base flex items-center gap-2 text-primary-dark"
            onClick={closeMenu}
          >
            <MdEmergency /> Akut hjälp
          </Link>
          <Link
            href="/kontakt"
            className="p-3 font-semibold text-base flex items-center gap-2 text-primary-dark"
            onClick={closeMenu}
          >
            <MdContactSupport /> Kontakt
          </Link>
        </div>
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
        <div className="xl:hidden mt-auto w-full border-t border-primary-light pt-4">
          <LoginNavigation />
        </div>
      </div>

      {!isMobile && activeMenu && (
        <>
          <Lightbox onClose={() => setActiveMenu(null)} />
          <div
            className="w-full bg-white absolute left-0 right-0 shadow-lg
              transition-all duration-300 ease-in-out opacity-100
              border-t border-primary-border animate-modal-slide-up top-[160px] z-[51]"
          >
            <div className="p-12 max-w-[1440px] mx-auto h-[440px]">
              {menu.menuItems.map((item) => {
                if (item.slug === activeMenu) {
                  return (
                    <div key={item.id} className="max-w-5xl mx-auto">
                      <Link
                        href={`/${item.slug}`}
                        onClick={() => {
                          setActiveMenu(null);
                          closeMenu();
                        }}
                        className="group flex items-center gap-3 text-3xl text-primary-dark font-semibold mb-8 hover:text-primary-medium transition-colors"
                      >
                        {item.title}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </Link>
                      <div className="flex gap-16">
                        <div className="flex-1">
                          <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                            {item.submenuItems.map((submenuItem) => (
                              <div key={submenuItem.id}>
                                <SubmenuItem
                                  title={submenuItem.title}
                                  route={`/${item.slug}/${submenuItem.slug}`}
                                  isMobile={false}
                                  onNavigate={() => {
                                    setActiveMenu(null);
                                    closeMenu();
                                  }}
                                />
                                <div className="h-[1px] bg-primary-light border-b border-primary-dark/10 mt-3" />
                              </div>
                            ))}
                          </div>
                        </div>
                        {item.image && (
                          <div className="w-[400px] flex flex-col gap-4">
                            <Image
                              src={item.image}
                              alt={`${item.title} image`}
                              width={450}
                              height={338}
                              quality={80}
                              className="w-full h-auto object-cover rounded-xl shadow-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default UnderNavigation;
