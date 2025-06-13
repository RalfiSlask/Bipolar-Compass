'use client';

import BipolarLogo from '@/app/components/logo/BipolarLogo';
import Spinner from '@/app/components/shared/Spinner';
import useIsMobile from '@/app/hooks/useIsMobile';
import { useResendVerification } from '@/app/hooks/useResendVerification';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const VerificationPage = () => {
  const isMobile = useIsMobile();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const { resendVerificationEmail, loading: resendLoading } =
    useResendVerification();

  useEffect(() => {
    const getVerification = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        toast.error('Ingen verifieringslänk hittades.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/verify?token=${token}`);

        if (response.data.verified) {
          toast.success('Din e-postadress är redan verifierad!');
          setIsAlreadyVerified(true);
        } else {
          toast.success('Din e-postadress har verifierats!');
          setIsEmailVerified(true);
          setUserEmail(response.data.email || '');
        }
      } catch (error) {
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage =
          axiosError.response?.data?.error ||
          'Något gick fel vid verifieringen.';
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    getVerification();
  }, []);

  const handleClickOnVerificationButton = () => {
    if (!userEmail) {
      return;
    }
    resendVerificationEmail(userEmail);
    toast.success('Ny verifieringslänk har skickats.');
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center relative px-4 py-12">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen flex justify-center items-center relative px-4 py-12">
      <div className="flex flex-col items-center w-full max-w-xl mx-auto z-10">
        {!isMobile && (
          <div className="flex justify-center mb-8 text-white absolute top-2 left-4">
            <BipolarLogo />
          </div>
        )}

        <div className="w-full">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-10 shadow-xl border border-primary-border">
            {isAlreadyVerified && (
              <div className="text-center flex flex-col gap-4">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-secondary-dark">
                  Din e-postadress är redan verifierad!
                </h2>
                <p className="text-gray-600">
                  Du kan nu logga in på ditt konto.
                </p>
              </div>
            )}

            {!isAlreadyVerified && isEmailVerified && (
              <div className="text-center flex flex-col gap-4">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-secondary-dark">
                  Din e-postadress har verifierats!
                </h2>
                <p className="text-gray-600">
                  Du kan nu logga in på ditt konto.
                </p>
              </div>
            )}

            {!isAlreadyVerified && !isEmailVerified && (
              <div className="text-center flex flex-col gap-6">
                <div className="w-16 h-16 bg-tertiary-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-tertiary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-secondary-dark">
                  Verifieringslänken är ogiltig eller har gått ut
                </h2>
                <p className="text-gray-600">
                  Klicka på knappen nedan för att få en ny verifieringslänk.
                </p>
                <button
                  onClick={handleClickOnVerificationButton}
                  disabled={resendLoading}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-medium transition-all
                    ${
                      resendLoading
                        ? 'bg-primary-border cursor-not-allowed'
                        : 'bg-primary-dark hover:bg-primary-accent active:transform active:scale-95'
                    }`}
                >
                  {resendLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner />
                      Skickar...
                    </span>
                  ) : (
                    'Skicka ny verifieringslänk'
                  )}
                </button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-300 flex justify-center">
              <Link
                href="/konto/logga-in"
                className="primary-button text-center"
              >
                Gå till inloggning
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationPage;
