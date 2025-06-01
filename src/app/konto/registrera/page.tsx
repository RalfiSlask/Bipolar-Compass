'use client';

import BipolarLogo from '@/app/components/logo/BipolarLogo';
import RegisterForm from '../../components/pages/auth/register/RegisterForm';

const RegistrationPage = () => {
  return (
    <section className="w-full min-h-screen flex justify-center items-center relative px-4 pt-20 pb-8 md:py-24">
      <div className="flex flex-col items-center w-full max-w-lg mx-auto z-10">
        <div className="flex justify-center mb-8 text-white absolute top-2 left-4 md:left-8">
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
                Skapa konto
              </h1>
              <p className="text-dark">
                Bli medlem i och få tillgång till alla våra tjänster
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
            </div>
            <RegisterForm />
            <p className="text-center text-sm text-dark mt-4">
              Har du redan ett konto?{' '}
              <a
                href="/konto/logga-in"
                className="nav-link font-medium text-primary-dark hover:text-primary transition-colors"
              >
                Logga in här
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-b from-white to-primary-medium z-0"></div>
    </section>
  );
};

export default RegistrationPage;
