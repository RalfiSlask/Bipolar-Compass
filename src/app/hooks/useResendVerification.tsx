import { useState } from 'react';
import axios from 'axios';

export const useResendVerification = () => {
  const [message, setMessage] = useState('');

  const resendVerificationEmail = async (email: string) => {
    try {
      const response = await axios.post('/api/verify/resend', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Verification email could not be resent:', error);
      setMessage('An error occurred while trying to resend the link.');
    }
  };

  return { resendVerificationEmail, message };
};
