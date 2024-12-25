'use client';

import menu from '../../data/menu.json';
import MenuItem from './MenuItem';

const Header = () => {
  return (
    <header className="bg-slate-300 h-[80px] w-screen flex px-4 items-center justify-end text-black">
      <div className="w-full flex justify-end">
        {menu.menuItems.map((menuItem) => {
          return <MenuItem key={menuItem.id} menuItem={menuItem} />;
        })}
      </div>
    </header>
  );
};

export default Header;
