'use client';

import BipolarLogo from '@/app/components/logo/BipolarLogo';
import LoginForm from '@/app/components/pages/auth/login/LoginForm';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <section className="w-full min-h-screen flex justify-center items-center relative px-4 py-8 md:py-24">
      <div className="flex flex-col items-center w-full max-w-lg mx-auto z-10">
        <div className="flex justify-center mb-8 text-white absolute top-2 left-4">
          <BipolarLogo />
        </div>

        <div className="w-full">
          <div
            className="bg-white rounded-xl p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 border-2 border-primary-dark/50"
            style={{
              boxShadow: `
                -10px 0 20px -5px rgba(255, 255, 255, 0.3), 
                10px 0 20px -5px rgba(101, 149, 152, 0.6)
              `,
            }}
          >
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-primary-dark mb-2">
                Logga in
              </h1>
              <p className="text-gray-600">
                Välkommen tillbaka till ditt konto
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>
              <LoginForm />
              <p className="text-center text-sm mt-4 hover:text-primary-dark duration-200 transition-colors">
                <Link href="/konto/glomt-losenord" className="font-medium">
                  Har du glömt ditt lösenord?
                </Link>
              </p>
              <p className="text-center text-sm text-gray-600 mt-2">
                Har du inget konto?{' '}
                <Link
                  href="/konto/registrera"
                  className="nav-link text-primary-dark font-medium"
                >
                  Registrera här
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-b from-white to-primary-medium z-0"></div>
    </section>
  );
};

export default LoginPage;
