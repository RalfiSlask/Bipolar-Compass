import Link from 'next/link';
import { MdContactSupport, MdEmergency } from 'react-icons/md';
import LoginNavigation from './LoginNavigation';

const OverNavigation = () => {
  return (
    <div className="w-full hidden xl:flex items-center justify-center gap-2 bg-primary-light text-[#19505bCC] font-medium">
      <div className="w-full max-w-[1440px] flex gap-2 py-4 items-center justify-between px-6 lg:px-8">
        <div className="flex gap-2">
          <Link
            className="rounded-lg py-1 px-2 flex items-center gap-2 text-primary-dark hover:bg-white/50 transition-all duration-200 group"
            href="/akut"
          >
            <MdEmergency className="text-tertiary-dark group-hover:scale-110 transition-transform duration-200" />
            <span className="group-hover:text-tertiary-dark transition-colors duration-200">
              Akut hjälp
            </span>
          </Link>
          <Link
            className="rounded-lg py-1 px-2 flex items-center gap-2 text-primary-dark hover:bg-white/80 transition-all duration-200 group"
            href="/kontakt"
          >
            <MdContactSupport className="transition-transform duration-200" />
            <span className="group-hover:text-secondary-dark transition-colors duration-200">
              Kontakt
            </span>
          </Link>
        </div>
        <LoginNavigation />
      </div>
    </div>
  );
};

export default OverNavigation;
