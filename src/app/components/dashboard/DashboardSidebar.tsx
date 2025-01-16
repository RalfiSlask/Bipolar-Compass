'use client';

import { FiSidebar, FiUser } from 'react-icons/fi';
import BipolarLogo from '../logo/BipolarLogo';
import { CloseIcon } from '../shared/icons/CloseIcon';
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
        className={`sidebar fixed left-0 top-0 h-full bg-primary-light w-full lg:max-w-[320px] z-40 shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col items-end h-full">
          <div className="flex justify-between w-full items-center border-b border-primary-medium/30 p-6">
            <div className="mt-1">
              <BipolarLogo size={'small'} />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="sidebar-toggle group p-0  text-white rounded-full bg-primary-dark hover:bg-primary-medium/20 transition-colors duration-200"
              aria-label="Stäng sidopanel"
            >
              <CloseIcon className="text-white group-hover:text-primary-dark w-4 h-4" />
            </button>
          </div>

          <DashboardNavigation />
          <div className="mt-auto p-6 flex justify-center items-center w-full border-t border-primary-medium/30">
            <FiUser className="w-4 h-4 text-primary-dark/80 mr-2" />
            <p className="text-sm text-primary-dark/80">{email}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
