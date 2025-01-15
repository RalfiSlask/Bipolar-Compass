'use client';

import BipolarLogo from '@/app/components/logo/BipolarLogo';
import { useResendVerification } from '@/app/hooks/useResendVerification';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const VerificationPage = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVerification = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      console.log('this is the token: ', token);
      try {
        const response = await axios.get(`/api/verify?token=${token}`);
        console.log('this is the verification response: ', response.data);

        if (response.data.verified) {
          setIsAlreadyVerified(true);
        } else {
          setIsEmailVerified(true);
          setUserEmail(response.data.email || '');
        }
      } catch (err) {
        console.error('Could not fetch verification status:', err);
      } finally {
        setLoading(false);
      }
    };

    getVerification();
  }, []);

  const { resendVerificationEmail, message: resendMessage } =
    useResendVerification();

  const handleClickOnVerificationButton = () => {
    if (!userEmail) {
      return;
    }
    resendVerificationEmail(userEmail);
  };

  if (loading) {
    return <p>Laddar verifieringsstatus...</p>;
  }

  return (
    <section className="h-screen w-full flex justify-center items-center relative">
      <div className="flex flex-col items-center px-4 py-12 sm:px-6 lg:px-8 max-w-[300px] sm:max-w-full min-w-[500px] z-10">
        <div className="flex justify-center mb-8 text-white fixed top-2 left-4">
          <BipolarLogo />
        </div>

        <div className="w-full max-w-lg">
          <div
            className="bg-white rounded-xl p-8 flex flex-col gap-8 border-2 border-primary-dark/50"
            style={{
              boxShadow: `
                -10px 0 20px -5px rgba(255, 255, 255, 0.3), 
                10px 0 20px -5px rgba(101, 149, 152, 0.6)
              `,
            }}
          >
            {isAlreadyVerified && (
              <>
                <h2>Din email address är redan verifierad!</h2>
                <p>Bara att logga in.</p>
              </>
            )}

            {!isAlreadyVerified && isEmailVerified && (
              <>
                <h2>Din email address har blivit verifierad!</h2>
                <p>Du kan nu logga in på ditt konto.</p>
              </>
            )}

            {!isAlreadyVerified && !isEmailVerified && (
              <>
                <h2>
                  Något blev fel. Var vänlig skicka länken igen. Länken har
                  också ett utgångsdatum.
                </h2>
                <button onClick={handleClickOnVerificationButton}>
                  Skicka verifieringslänk
                </button>
              </>
            )}

            {resendMessage && <p>{resendMessage}</p>}

            <Link href="/konto/logga-in">Logga in här</Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-b from-white to-primary-medium z-0"></div>
    </section>
  );
};

export default VerificationPage;
