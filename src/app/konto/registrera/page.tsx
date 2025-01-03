'use client';

import RegisterForm from '@/app/components/pages/auth/register/RegisterForm';

const RegistrationPage = () => {
  return (
    <div className="h-full flex flex-col items-center mt-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-primary-dark mb-2">
              Skapa konto
            </h1>
            <p className="text-gray-600">
              Bli medlem i och få tillgång till alla våra tjänster
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>
          <RegisterForm />

          <p className="text-center text-sm text-gray-600 mt-4">
            Har du redan ett konto?{' '}
            <a
              href="/konto/logga-in"
              className="font-medium text-primary-dark hover:text-primary transition-colors"
            >
              Logga in här
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
