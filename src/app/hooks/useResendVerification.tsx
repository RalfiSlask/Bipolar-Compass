import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const useResendVerification = () => {
  const [loading, setLoading] = useState(false);

  const resendVerificationEmail = async (email: string) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/verify/resend', { email });

      if (response.data.verified) {
        toast.success('Din e-postadress är redan verifierad!');
        return true;
      }

      toast.success('Ny verifieringslänk har skickats!');
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const errorMessage =
        axiosError.response?.data?.error ||
        'Något gick fel när verifieringslänken skulle skickas.';
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { resendVerificationEmail, loading };
};
