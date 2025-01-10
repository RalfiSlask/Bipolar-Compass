import Link from 'next/link';

const TermsOfUsePage = () => {
  return (
    <section className="container mx-auto max-w-4xl w-full flex flex-col gap-8 py-8 px-4">
      <div className="flex flex-col gap-4">
        <h2 className="h-md text-primary-dark">Användarvillkor</h2>
        <p className="text-lg">
          Välkommen till vår tjänst! Dessa användarvillkor reglerar ditt
          användande av vår webbplats och dess funktioner, inklusive
          mood-tracker, dagbok, AI-tjänst och Spotify-sektionen. Genom att
          använda vår tjänst godkänner du dessa villkor. Om du inte godkänner
          villkoren, ber vi dig att inte använda tjänsten.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          1. Introduktion
        </h3>
        <p>
          Denna tjänst tillhandahålls för att hjälpa användare att spåra sitt
          mående, skriva dagboksanteckningar och kommunicera med vår AI-tjänst.
          Tjänsten är för personlig användning och får inte användas i
          kommersiella syften.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          2. Användarkonto
        </h3>
        <ul className="flex flex-col gap-2 pl-6 list-disc">
          <li>Du måste skapa ett konto för att använda våra funktioner.</li>
          <li>
            Du ansvarar för att tillhandahålla korrekt information och att hålla
            dina inloggningsuppgifter konfidentiella.
          </li>
          <li>
            Om du misstänker obehörig användning av ditt konto, kontakta oss
            omedelbart.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          3. Tillåten användning
        </h3>
        <h4>
          Du får endast använda tjänsten för lagliga syften och i enlighet med
          dessa villkor. Följande är inte tillåtet:
        </h4>
        <ul className="flex flex-col gap-2 pl-6 list-disc">
          <li>
            Att ladda upp eller dela olagligt, stötande eller skadligt innehåll.
          </li>
          <li>Att manipulera eller hacka tjänsten.</li>
          <li>
            Att använda AI-tjänsten för att generera innehåll som bryter mot
            lagar eller tredjepartsrättigheter.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          4. Begränsning av ansvar
        </h3>
        <ul className="flex flex-col gap-2 pl-6 list-disc">
          <li>
            Tjänsten är inte avsedd att ge medicinska råd. Användare bör alltid
            konsultera en professionell vårdgivare vid behov.
          </li>
          <li>
            Vi ansvarar inte för skador som uppstår till följd av användning av
            tjänsten.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          5. Immateriella rättigheter
        </h3>
        <ul className="flex flex-col gap-2 pl-6 list-disc">
          <li>
            Allt innehåll och funktionalitet i tjänsten, inklusive AI-genererade
            svar, ägs av oss eller våra licensgivare.
          </li>
          <li>
            Användare får inte kopiera, distribuera eller använda innehåll från
            tjänsten utan vårt skriftliga medgivande.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          6. Tillgänglighet och ändringar
        </h3>
        <ul className="flex flex-col gap-2 pl-6 list-disc">
          <li>
            Vi strävar efter att hålla tjänsten tillgänglig, men vi kan inte
            garantera oavbruten drift. Tjänsten kan vara otillgänglig vid
            underhåll eller tekniska problem.
          </li>
          <li>
            Vi förbehåller oss rätten att ändra, uppdatera eller avsluta delar
            av eller hela tjänsten utan föregående meddelande.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          7. Upphörande av användning
        </h3>
        <p>
          Vi förbehåller oss rätten att avsluta eller begränsa ditt konto om du
          bryter mot dessa villkor.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          8. Ändringar i villkoren
        </h3>
        <p>
          Dessa villkor kan komma att uppdateras. Vi informerar dig om
          väsentliga ändringar genom e-post eller meddelanden på webbplatsen.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">9. Kontakt</h3>
        <p>För frågor om dessa användarvillkor, kontakta oss:</p>
        <p>
          <strong>E-post</strong>: bipolärkompassen@gmail.com
          <br />
          <strong>Kontaktformulär</strong>:{' '}
          <Link href="/kontakt" aria-label="Kontakta oss" className="underline">
            Kontakta oss
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="italic">
          Dessa användarvillkor gäller från och med 2025-01-31.
        </p>
      </div>
    </section>
  );
};

export default TermsOfUsePage;
