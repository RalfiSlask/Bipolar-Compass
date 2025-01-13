import Link from 'next/link';
import { MdContactSupport, MdEmergency } from 'react-icons/md';
import LoginNavigation from './LoginNavigation';

const OverNavigation = () => {
  return (
    <div className="w-full flex items-center justify-center gap-2 bg-primary-light text-[#19505bCC] font-medium">
      <div className="w-full max-w-[1440px] flex gap-2 py-4 items-center justify-between px-6 lg:px-8">
        <div className="flex gap-2">
          <Link
            className="rounded-lg py-1 px-2 flex items-center gap-2"
            href="/akut"
          >
            <MdEmergency /> Akut hjälp
          </Link>
          <div className="flex gap-2">
            <Link
              className="rounded-lg py-1 px-2 flex items-center gap-2"
              href="/kontakt"
            >
              <MdContactSupport /> Kontakt
            </Link>
          </div>
        </div>
        <LoginNavigation />
      </div>
    </div>
  );
};

export default OverNavigation;
