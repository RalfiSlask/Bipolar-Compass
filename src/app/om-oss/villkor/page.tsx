import AboutUsSection from '@/app/components/shared/AboutUsSection';
import Link from 'next/link';
import { AiOutlineSafety } from 'react-icons/ai';
import { BsEnvelope, BsShieldCheck } from 'react-icons/bs';
import { HiOutlineCog } from 'react-icons/hi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlineAccountCircle, MdOutlineGavel } from 'react-icons/md';

const TermsOfUsePage = () => {
  return (
    <section className="container mx-auto max-w-4xl w-full flex flex-col gap-8 sm:gap-10 py-4 sm:pt-10 pb-16 px-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <IoDocumentTextOutline className="text-3xl text-primary-medium" />
          <h2 className="h-md text-primary-dark">Användarvillkor</h2>
        </div>
        <div className="bg-primary-light rounded-lg p-6">
          <p className="text-lg">
            Välkommen till vår tjänst! Dessa användarvillkor reglerar ditt
            användande av vår webbplats och dess funktioner, inklusive
            mood-tracker, dagbok, AI-tjänst och Spotify-sektionen. Genom att
            använda vår tjänst godkänner du dessa villkor. Om du inte godkänner
            villkoren, ber vi dig att inte använda tjänsten.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:gap-10">
        <AboutUsSection
          icon={<MdOutlineGavel />}
          title="Introduktion"
          content={
            <p>
              Denna tjänst tillhandahålls för att hjälpa användare att spåra
              sitt mående, skriva dagboksanteckningar och kommunicera med vår
              AI-tjänst. Tjänsten är för personlig användning och får inte
              användas i kommersiella syften.
            </p>
          }
        />

        <AboutUsSection
          icon={<MdOutlineAccountCircle />}
          title="Användarkonto"
          content={
            <ul className="flex flex-col gap-2 pl-6 list-disc marker:text-primary-medium">
              <li>Du måste skapa ett konto för att använda våra funktioner.</li>
              <li>
                Du ansvarar för att tillhandahålla korrekt information och att
                hålla dina inloggningsuppgifter konfidentiella.
              </li>
              <li>
                Om du misstänker obehörig användning av ditt konto, kontakta oss
                omedelbart.
              </li>
            </ul>
          }
        />

        <AboutUsSection
          icon={<BsShieldCheck />}
          title="Tillåten användning"
          content={
            <div>
              <h4 className="mb-4">
                Du får endast använda tjänsten för lagliga syften och i enlighet
                med dessa villkor. Följande är inte tillåtet:
              </h4>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li>
                  Att ladda upp eller dela olagligt, stötande eller skadligt
                  innehåll.
                </li>
                <li>Att manipulera eller hacka tjänsten.</li>
                <li>
                  Att använda AI-tjänsten för att generera innehåll som bryter
                  mot lagar eller tredjepartsrättigheter.
                </li>
              </ul>
            </div>
          }
        />

        <AboutUsSection
          icon={<AiOutlineSafety />}
          title="Begränsning av ansvar"
          content={
            <ul className="flex flex-col gap-2 pl-6 list-disc">
              <li>
                Tjänsten är inte avsedd att ge medicinska råd. Användare bör
                alltid konsultera en professionell vårdgivare vid behov.
              </li>
              <li>
                Vi ansvarar inte för skador som uppstår till följd av användning
                av tjänsten.
              </li>
            </ul>
          }
        />

        <AboutUsSection
          icon={<HiOutlineCog />}
          title="Immateriella rättigheter"
          content={
            <ul className="flex flex-col gap-2 pl-6 list-disc">
              <li>
                Allt innehåll och funktionalitet i tjänsten, inklusive
                AI-genererade svar, ägs av oss eller våra licensgivare.
              </li>
              <li>
                Användare får inte kopiera, distribuera eller använda innehåll
                från tjänsten utan vårt skriftliga medgivande.
              </li>
            </ul>
          }
        />

        <AboutUsSection
          icon={<HiOutlineCog />}
          title="Tillgänglighet och ändringar"
          content={
            <ul className="flex flex-col gap-2 pl-6 list-disc">
              <li>
                Vi strävar efter att hålla tjänsten tillgänglig, men vi kan inte
                garantera oavbruten drift. Tjänsten kan vara otillgänglig vid
                underhåll eller tekniska problem.
              </li>
              <li>
                Vi förbehåller oss rätten att ändra, uppdatera eller avsluta
                delar av eller hela tjänsten utan föregående meddelande.
              </li>
            </ul>
          }
        />

        <AboutUsSection
          icon={<MdOutlineGavel />}
          title="Upphörande av användning"
          content={
            <p>
              Vi förbehåller oss rätten att avsluta eller begränsa ditt konto om
              du bryter mot dessa villkor.
            </p>
          }
        />

        <AboutUsSection
          icon={<MdOutlineGavel />}
          title="Ändringar i villkoren"
          content={
            <p>
              Dessa villkor kan komma att uppdateras. Vi informerar dig om
              väsentliga ändringar genom e-post eller meddelanden på
              webbplatsen.
            </p>
          }
        />

        <AboutUsSection
          icon={<BsEnvelope />}
          title="Kontakt"
          content={
            <div>
              <p>För frågor om dessa användarvillkor, kontakta oss:</p>
              <p>
                <strong>E-post</strong>: bipolärkompassen@gmail.com
                <br />
                <strong>Kontaktformulär</strong>:{' '}
                <Link
                  href="/kontakt"
                  aria-label="Kontakta oss"
                  className="nav-link text-primary-dark font-normal"
                >
                  Kontakta oss
                </Link>
              </p>
            </div>
          }
        />

        <div className="mt-8 p-4 bg-tertiary-light rounded-lg">
          <p className="italic text-gray-700">
            Dessa användarvillkor gäller från och med 2025-01-31.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfUsePage;
