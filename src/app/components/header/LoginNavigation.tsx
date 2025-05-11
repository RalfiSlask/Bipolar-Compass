import { ICustomSession } from '@/app/types/authoptions';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

interface LoginNavigationProps {
  closeMenu?: () => void;
}

const LoginNavigation = ({ closeMenu }: LoginNavigationProps) => {
  const { data: session } = useSession() as { data: ICustomSession | null };
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Utloggning misslyckades:', error);
    }
  };

  const handleClick = () => {
    if (closeMenu) {
      closeMenu();
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 xl:pr-2">
      {session ? (
        <div className="flex items-center gap-4 sm:gap-6 px-3 xl:px-0">
          <Link
            href="/min-sida"
            className="rounded-lg min-w-[102px] sm:min-w-min py-1 xl:px-2 flex items-center gap-2 text-primary-dark hover:bg-white/80 transition-all duration-200 group"
          >
            <FaUser className="transition-transform duration-200" />
            <span className="group-hover:text-primary-accent transition-colors duration-200 ">
              Min Sida
            </span>
          </Link>
          <button
            onClick={handleSignOut}
            className="rounded-lg py-1 xl:px-2 flex items-center gap-2 text-primary-dark hover:bg-white/80 transition-all duration-200 group"
          >
            <FaSignOutAlt className="w-4 h-4 transition-transform duration-200" />
            <span className="group-hover:text-secondary-dark transition-colors duration-200">
              Logga ut
            </span>
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link
            href="/konto/logga-in"
            className="rounded-md primary-button text-white min-h-[40px] py-2 px-2 text-center"
            onClick={handleClick}
          >
            Logga in
          </Link>
          <Link
            href="/konto/registrera"
            className="rounded-md border advanced-secondary-button h-10 flex justify-center items-center py-1 px-2"
            onClick={handleClick}
          >
            Registrera
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginNavigation;
