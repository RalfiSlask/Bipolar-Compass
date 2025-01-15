import { ICustomSession } from '@/app/types/authoptions';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const LoginNavigation = () => {
  const { data: session } = useSession() as { data: ICustomSession | null };
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Utloggning misslyckades:', error);
    }
  };

  return (
    <div className="flex items-center justify-end pr-2">
      {session ? (
        <button onClick={handleSignOut}>Logga ut</button>
      ) : (
        <div className="flex gap-4 items-center">
          <Link
            href="/konto/logga-in"
            className="rounded-md primary-button text-white py-2 px-2 text-center"
          >
            Logga in
          </Link>
          <Link
            href="/konto/registrera"
            className="rounded-md border advanced-secondary-button h-10 flex justify-center items-center py-1 px-2"
          >
            Registrera
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginNavigation;
