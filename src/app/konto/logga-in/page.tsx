'use client';

import LoginForm from '@/app/components/pages/auth/login/LoginForm';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="h-full flex flex-col items-center mt-10 px-4 py-12 sm:px-6 lg:px-8 max-w-[300px] sm:max-w-full min-w-[500px]">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-primary-dark mb-2">
              Logga in
            </h1>
            <p className="text-gray-600">Välkommen tillbaka till ditt konto</p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>
          <LoginForm />
          <p className="text-center text-sm text-gray-600 mt-4">
            Har du inget konto?{' '}
            <Link
              href="/konto/registrera"
              className="font-medium text-primary-dark hover:text-primary transition-colors"
            >
              Registrera här
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
