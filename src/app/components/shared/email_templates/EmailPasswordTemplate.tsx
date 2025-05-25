interface IPasswordTemplateProps {
  resetLink: string;
}

const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

const EmailPasswordTemplate = ({
  resetLink,
}: IPasswordTemplateProps): string => `
  <div style="font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #eff7f7; padding: 20px; border: 1px solid #a1b8bd; border-radius: 10px; max-width: 900px; margin: auto;">
    <!-- Header -->
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #a1b8bd;">
      <h1 style="color: #659598; font-size: 1.8em; margin: 0;">Bipolärkompassen</h1>
      <p style="color: #374151; font-size: 1em; margin: 10px 0;">Guiden för att förstå och hantera bipolaritet</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 20px 0; text-align: left;">
      <h2 style="color: #659598; font-size: 1.5em; margin: 0 0 10px;">Återställ ditt lösenord</h2>
      <p style="font-size: 1em; margin: 10px 0;">
        Hej,
      </p>
      <p style="font-size: 1em; margin: 10px 0;">
        Vi har fått en begäran om att återställa ditt lösenord för <strong>Bipolärkompassen</strong>. Klicka på knappen nedan för att återställa ditt lösenord:
      </p>

      <!-- Button -->
      <div style="text-align: center; margin: 20px 0;">
        <a
          href="${resetLink}"
          style="display: inline-block; padding: 15px 25px; background-color: #659598; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 1.1em; font-weight: bold;"
          aria-label="Återställ ditt lösenord"
        >
          Återställ lösenord
        </a>
      </div>

      <!-- Note -->
      <p style="font-size: 0.9em; margin: 20px 0; color: #374151;">
        Om du inte har begärt en återställning av lösenordet kan du ignorera detta meddelande.
      </p>
    </div>

    <!-- Divider -->
    <hr style="border: none; border-top: 1px solid #a1b8bd; margin: 20px 0;" />

    <!-- Footer -->
    <div style="text-align: center; font-size: 0.85em; color: #374151; background-color: #1a1f20; padding: 10px;">
      <p style="margin: 0;">Detta är ett automatiskt meddelande från <strong>Bipolärkompassen</strong>.</p>
      <p style="margin: 5px 0;">Har du frågor? Besök vår <a href="${baseUrl}/kontakt" style="color: #25424e; text-decoration: none;">kontaktsida</a>.</p>
    </div>
  </div>
`;

export default EmailPasswordTemplate;
