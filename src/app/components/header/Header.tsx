'use client';

import LoginNavigation from './LoginNavigation';
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const isAccountPage = pathname.startsWith('/konto');

  if (isAccountPage) return null;

  return (
    <header className="bg-slate-300 h-40 w-screen flex flex-col justify-between items-end text-black">
      <LoginNavigation />
      <Navbar />
    </header>
  );
};

export default Header;
