import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const LoginNavigation = () => {
  const { data: session /* status */ } = useSession();

  console.log('this is the session: ', session);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Utloggning misslyckades:', error);
    }
  };

  return (
    <div className="bg-green-100 w-full h-32 flex items-center justify-end px-12">
      {session ? (
        <button onClick={handleSignOut}>Logga ut</button>
      ) : (
        <Link href="/konto/logga-in">Logga in</Link>
      )}
    </div>
  );
};

export default LoginNavigation;
