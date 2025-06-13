'use client';

import BipolarLogo from '@/app/components/logo/BipolarLogo';
import Spinner from '@/app/components/shared/Spinner';
import useIsMobile from '@/app/hooks/useIsMobile';
import { useResendVerification } from '@/app/hooks/useResendVerification';
import { ICustomSession } from '@/app/types/authoptions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdEmail } from 'react-icons/md';

const SendVerificationLinkPage = () => {
  const isMobile = useIsMobile();
  const { data: session } = useSession() as { data: ICustomSession | null };
  const [countdown, setCountdown] = useState(0);
  const COOLDOWN_TIME = 90;

  const { resendVerificationEmail, loading: resendLoading } =
    useResendVerification();

  useEffect(() => {
    // This effect is used to countdown the time before the user can resend the verification email again.
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleClickOnVerificationButton = async () => {
    if (!session?.user.email) {
      toast.error('Ingen e-postadress hittades.');
      return;
    }

    const success = await resendVerificationEmail(session.user.email);
    if (success) {
      toast.success('Ny verifieringslänk har skickats.');
      setCountdown(COOLDOWN_TIME);
    }
  };

  if (!session?.user) {
    return <Spinner />;
  }

  return (
    <section className="account-section">
      <div className="flex flex-col items-center w-full max-w-lg mx-auto z-10">
        {!isMobile && (
          <div className="flex justify-center mb-8 text-white absolute top-2 left-4">
            <BipolarLogo />
          </div>
        )}

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
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary-dark justify-center mb-4">
                <MdEmail className="w-6 h-6" />
                <div className="text-center text-primary-dark text-lg font-bold">
                  Vi har skickat dig en verifieringslänk.
                </div>
              </div>
              <p className="text-base text-gray-600">
                Var vänlig och kontrollera din e-post. Kolla även i din
                skräppost så den inte har hamnat där.
              </p>
              <p className="text-base text-gray-600">
                Om du ej får till det, klicka på knappen nedan för att få en ny
                verifieringslänk.
              </p>
            </div>
            <button
              onClick={handleClickOnVerificationButton}
              disabled={countdown > 0 || resendLoading}
              className={`px-4 py-2 rounded-lg bg-primary-dark text-white transition-all
                ${
                  countdown > 0 || resendLoading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-primary-medium'
                }`}
            >
              {resendLoading
                ? 'Skickar...'
                : countdown > 0
                ? `Vänta ${countdown} sekunder...`
                : 'Skicka verifieringslänk'}
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 w-1/2 h-full bg-gradient-to-b from-white to-primary-medium z-0"></div>
    </section>
  );
};

export default SendVerificationLinkPage;
