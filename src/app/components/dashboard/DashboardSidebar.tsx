'use client';

import Image from 'next/image';
import { FiSidebar } from 'react-icons/fi';
import closeIcon from '../../assets/icons/close.svg';

import DashboardNavigation from './DashboardNavigation';

interface IDashboardSidebarProps {
  email: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DashboardSidebar = ({
  email,
  isOpen,
  setIsOpen,
}: IDashboardSidebarProps) => {
  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-0 top-10 transform -translate-x-1/2 hover:-translate-x-1/4 p-2 rouded-l-none z-20 rounded-r-full bg-primary-dark text-white shadow-lg  w-[80px] flex items-center justify-end transition-all duration-300 hover:pl-2"
          aria-label="Öppna sidopanel"
        >
          <FiSidebar
            size={24}
            className="transform transition-transform duration-300 hover:translate-x-0.5"
          />
        </button>
      )}

      <aside
        className={`sidebar fixed left-0 top-0 h-full bg-primary-light w-full lg:max-w-[240px] z-40 shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="sidebar-toggle p-2 rounded-full hover:bg-primary-medium/20 transition-colors duration-200"
            aria-label="Stäng sidopanel"
          >
            <Image
              src={closeIcon}
              alt="stäng sidopanel"
              width={24}
              height={24}
            />
          </button>

          <DashboardNavigation />
          <div className="mt-auto pt-4 border-t border-primary-medium/10">
            <p className="text-sm text-primary-dark/80 mb-2">{email}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
