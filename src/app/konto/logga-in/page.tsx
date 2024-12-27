'use client';

import LoginForm from '@/app/components/pages/auth/login/LoginForm';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div>
      <h2>Logga in</h2>
      <LoginForm />
      <Link href="/konto/registrera">Har du inget konto? registrera här</Link>
    </div>
  );
};

export default LoginPage;
