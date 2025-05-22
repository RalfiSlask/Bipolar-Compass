interface IEmailMedicationProps {
  medication: string;
  time: string;
}

const EmailMedicationTemplate = ({
  medication,
  time,
}: IEmailMedicationProps): string => `
  <div style="font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9fafb; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; max-width: 900px; margin: auto;">
    <!-- Header -->
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eaeaea;">
      <h1 style="color: #659598; font-size: 1.8em; margin: 0;">Bipolärkompassen</h1>
      <p style="color: #555; font-size: 1em; margin: 10px 0;">Guiden för att förstå och hantera bipolaritet</p>
    </div>

    <!-- Main Content -->
      <div style="padding: 20px 0; text-align: left;">
        <p style="font-size: 0.9em; margin: 20px 0; color: #555;">
         Dags att ta din medicin ${medication} vid ${time}.
        </p>
      </div>
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

export default EmailMedicationTemplate;
