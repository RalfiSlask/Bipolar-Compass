'use client';

import menu from '../../data/menu.json';
import MenuItem from './MenuItem';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full h-14 flex justify-end items-center gap-10 px-12">
      {menu.menuItems.map((menuItem) => {
        return <MenuItem key={menuItem.id} menuItem={menuItem} />;
      })}
      {session && <Link href="/min-sida">Min Sida</Link>}
    </nav>
  );
};

export default Navbar;
