'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import OverNavigation from './OverNavigation';
import UnderNavigation from './UnderNavigation';

const Header = () => {
  const pathname = usePathname();
  const isAccountPage = pathname?.startsWith('/konto');
  const isDashboardPage = pathname?.startsWith('/min-sida');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const MOBILE_BREAKPOINT = 1280;

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const resetMenu = () => {
    setActiveMenu(null);
    closeMenu();
  };

  if (isAccountPage || isDashboardPage) return null;

  return (
    <header className="relative z-[50] w-full h-[96px] xl:h-[160px] gap-4 border-b-2 border-primary-medium shadow-sm bg-white flex flex-col items-center text-black">
      <div className="w-full flex flex-col h-full items-center bg-white">
        <OverNavigation resetMenu={resetMenu} />
        <UnderNavigation
          toggleMenuOpen={toggleMenuOpen}
          setActiveMenu={setActiveMenu}
          resetMenu={resetMenu}
          closeMenu={closeMenu}
          isMobile={isMobile}
          isMenuOpen={isMenuOpen}
          activeMenu={activeMenu}
        />
      </div>
    </header>
  );
};

export default Header;
