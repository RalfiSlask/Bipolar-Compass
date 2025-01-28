import EmailTemplate from '../components/EmailTemplate';
import PasswordTemplate from '../components/PasswordTemplate';
import { emailTransporter } from '../lib/nodemailer';
import { IContactEmail, IVerificationEmail } from '../types/email';

/**
 * Returns a verification link for a verification email
 * @param {string} token
 * @returns {string}
 */
export const getVerificationLink = (token: string): string => {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  return `${baseUrl}/konto/verifiera?token=${token}`;
};

/**
 * Sends a verification email to the user by using a provided verification token and email
 * Uses an html template for the email and a nodemailer transport to send the email
 * @param {IVerificationEmail} verificationEmail
 * @returns {Promise<void>}
 */
export const sendVerificationEmail = async ({
  verificationToken,
  email,
}: IVerificationEmail): Promise<void> => {
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

/**
 * Returns a reset link for a forgot password email
 * @param {string} token
 * @returns {string}
 */
const getResetLink = (token: string): string => {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  return `${baseUrl}/konto/aterstall-losenord?token=${token}`;
};

/**
 * Sends a forgot password email to the user by using a provided reset token and email
 * Uses an html template for the email and a nodemailer transport to send the email
 * @param {string} email
 * @param {string} resetToken
 * @returns {Promise<void>}
 */
export const sendForgotPasswordEmail = async ({
  email,
  resetToken,
}: {
  email: string;
  resetToken: string;
}): Promise<void> => {
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

/**
 * Sends a contact email to the user by using a provided name, email and message
 * Uses an html template for the email and a nodemailer transport to send the email
 * @param {IContactEmail} contactEmail
 * @returns {Promise<void>}
 */
export const sendContactEmail = async ({
  name,
  email,
  message,
}: IContactEmail): Promise<void> => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Nytt kontaktformulär från ${name}`,
      html: `
        <h2>Nytt meddelande från kontaktformuläret</h2>
        <p><strong>Namn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Meddelande:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    };

    await emailTransporter.sendMail(mailOptions);
  } catch (err) {
    console.error(
      'Something went wrong when trying to send contact email: ',
      err
    );
    throw new Error('Contact email could not be sent');
  }
};
