import EmailTemplate from '../components/EmailTemplate';
import PasswordTemplate from '../components/PasswordTemplate';
import { emailTransporter } from '../lib/nodemailer';

export const getVerificationLink = (token: string): string => {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
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
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

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

interface IContactEmail {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = async ({
  name,
  email,
  message,
}: IContactEmail) => {
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
    console.error('Något gick fel när kontaktmeddelandet skulle skickas:', err);
    throw new Error('Kunde inte skicka kontaktmeddelandet');
  }
};
