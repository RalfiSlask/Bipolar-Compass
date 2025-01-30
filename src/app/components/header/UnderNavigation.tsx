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

  /**
   * Handle mobile and desktop view by checking window width
   * It closes the menu if the user resizes the window to desktop size
   * removes the event listener when the component unmounts to avoid memory leaks
   */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();

    const handleResize = () => {
      checkMobile();
      if (window.innerWidth >= MOBILE_BREAKPOINT && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restore the scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full flex justify-between items-center gap-10 max-w-[1440px] px-4 sm:px-6 xl:px-8 text-secondary-dark font-semibold py-4">
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
        flex flex-col xl:flex-row gap-1 sm:gap-2 xl:gap-3 lg:items-center
        ${
          isMenuOpen
            ? 'fixed xl:relative left-0 top-0 sm:top-[96px] w-full h-screen sm:h-[calc(100vh-96px)] items-start bg-white px-4 pt-3 pb-4 sm:p-4 shadow-lg z-[999] border-t border-primary-medium overflow-y-auto'
            : 'hidden xl:flex'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {isMenuOpen && (
          <div className="sm:hidden mb-4 flex justify-between items-center pt-1 w-full pr-3">
            <div className="absolute top-[94px] left-0 w-full h-[2px] bg-primary-medium" />
            <BipolarLogo />
            <button
              className="xl:hidden text-2xl hover:text-primary-medium transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        )}
        <div className="flex flex-col sm:flex-row w-full xl:hidden justify-between gap-2 border-b border-primary-light pb-4 mb-2">
          <div className="flex items-center gap-6 px-2 py-4">
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
          <div className="xl:hidden flex items-center h pl-2">
            <LoginNavigation closeMenu={closeMenu} />
          </div>
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
