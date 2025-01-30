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
    <div className="flex items-center justify-end gap-2 pr-2">
      {session ? (
        <div className="flex items-center gap-4">
          <Link
            href="/min-sida"
            className="rounded-lg py-1 px-2 flex items-center gap-2 text-primary-dark hover:bg-white/80 transition-all duration-200 group"
          >
            <FaUser className="transition-transform duration-200" />
            <span className="group-hover:text-primary-accent transition-colors duration-200">
              Min Sida
            </span>
          </Link>
          <button
            onClick={handleSignOut}
            className="rounded-lg py-1 px-2 flex items-center gap-2 text-primary-dark hover:bg-white/80 transition-all duration-200 group"
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
            className="py-1 px-2 hover:bg-white/80 rounded-lg transition-colors duration-200"
            onClick={handleClick}
          >
            Logga in
          </Link>
          <Link
            href="/konto/registrera"
            className="py-1 px-2 bg-primary-medium text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
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
