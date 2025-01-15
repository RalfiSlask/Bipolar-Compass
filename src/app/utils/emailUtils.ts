import EmailTemplate from '../components/EmailTemplate';
import PasswordTemplate from '../components/PasswordTemplate';
import { emailTransporter } from '../lib/nodemailer';

export const getVerificationLink = (token: string): string => {
  let baseUrl: string;

  if (process.env.NODE_ENV === 'development') {
    baseUrl = process.env.NEXT_LOCAL_URL || 'http://localhost:3000';
  } else if (process.env.NODE_ENV === 'production') {
    baseUrl = process.env.NEXT_PROD_URL || 'https://bipolärkompassen.se';
  } else {
    console.warn(
      'NODE_ENV is not correctly defined. We use fallback local url.'
    );
    baseUrl = 'http://localhost:3000';
  }

  return `${baseUrl}/konto/verifiera?token=${token}`;
};

interface IVerificationEmail {
  verificationToken: string;
  email: string;
}

export const sendVerificationEmail = async ({
  verificationToken,
  email,
}: IVerificationEmail) => {
  const verificationLink = getVerificationLink(verificationToken!);
  const emailHtml = EmailTemplate({ verificationLink });

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verifiera din e-postadress',
      html: emailHtml,
    };

    await emailTransporter.sendMail(mailOptions);
  } catch (err) {
    console.error(
      'Something went wrong when trying to send verification email: ',
      err
    );
    throw new Error('Verification email could not be sent');
  }
};

const getResetLink = (token: string): string => {
  let baseUrl: string;

  if (process.env.NODE_ENV === 'development') {
    baseUrl = process.env.NEXT_LOCAL_URL || 'http://localhost:3000';
  } else if (process.env.NODE_ENV === 'production') {
    baseUrl = process.env.NEXT_PROD_URL || 'https://bipolärkompassen.se';
  } else {
    console.warn(
      'NODE_ENV is not correctly defined. We use fallback local url.'
    );
    baseUrl = 'http://localhost:3000';
  }

  return `${baseUrl}/konto/aterstall-losenord?token=${token}`;
};

export const sendForgotPasswordEmail = async ({
  email,
  resetToken,
}: {
  email: string;
  resetToken: string;
}) => {
  const resetLink = getResetLink(resetToken);
  const emailHtml = PasswordTemplate({ resetLink });

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Återställ ditt lösenord',
      html: emailHtml,
    };

    await emailTransporter.sendMail(mailOptions);
  } catch (err) {
    console.error(
      'Something went wrong when trying to send forgot password email: ',
      err
    );
    throw new Error('Forgot password email could not be sent');
  }
};
