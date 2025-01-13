'use client';

import { usePathname } from 'next/navigation';
import OverNavigation from './OverNavigation';
import UnderNavigation from './UnderNavigation';

const Header = () => {
  const pathname = usePathname();
  const isAccountPage = pathname.startsWith('/konto');
  const isDashboardPage = pathname.startsWith('/min-sida');

  if (isAccountPage || isDashboardPage) return null;

  return (
    <header className="w-screen gap-4 border-b-2 border-primary-medium shadow-sm bg-white flex flex-col items-center text-black">
      <div className="w-full flex flex-col items-center">
        <OverNavigation />
        <UnderNavigation />
      </div>
    </header>
  );
};

export default Header;
