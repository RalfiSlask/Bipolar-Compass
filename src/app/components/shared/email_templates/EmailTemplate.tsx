interface IEmailTemplateProps {
  verificationLink: string;
}

const EmailTemplate = ({ verificationLink }: IEmailTemplateProps): string => `
  <div style="font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9fafb; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; max-width: 900px; margin: auto;">
    <!-- Header -->
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eaeaea;">
      <h1 style="color: #659598; font-size: 1.8em; margin: 0;">Bipolärkompassen</h1>
      <p style="color: #555; font-size: 1em; margin: 10px 0;">Guiden för att förstå och hantera bipolaritet</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 20px 0; text-align: left;">
      <h2 style="color: #659598; font-size: 1.5em; margin: 0 0 10px;">Verifiera din e-postadress</h2>
      <p style="font-size: 1em; margin: 10px 0;">
        Hej,
      </p>
      <p style="font-size: 1em; margin: 10px 0;">
        Tack för att du har registrerat dig på <strong>Bipolärkompassen</strong>, en plattform som ger stöd och kunskap om bipolaritet. Klicka på knappen nedan för att verifiera din e-postadress och komma igång:
      </p>

      <!-- Button -->
      <div style="text-align: center; margin: 20px 0;">
        <a
          href="${verificationLink}"
          style="display: inline-block; padding: 15px 25px; background-color: #659598; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 1.1em; font-weight: bold;"
        >
          Verifiera din e-postadress
        </a>
      </div>

      <!-- Note -->
      <p style="font-size: 0.9em; margin: 20px 0; color: #555;">
        Om du inte har registrerat dig på Bipolärkompassen kan du ignorera detta meddelande.
      </p>
    </div>

    <!-- Divider -->
    <hr style="border: none; border-top: 1px solid #a1b8bd; margin: 20px 0;" />

    <!-- Footer -->
    <div style="text-align: center; font-size: 0.85em; color: #777;">
      <p style="margin: 0;">Detta är ett automatiskt meddelande från <strong>Bipolärkompassen</strong>.</p>
      <p style="margin: 5px 0;">Har du frågor? Besök vår <a href="https://bipolarkompassen.se/om-oss/kontakt" style="color: #6ba292; text-decoration: none;">kontaktsida</a>.</p>
    </div>
  </div>
`;

export default EmailTemplate;
