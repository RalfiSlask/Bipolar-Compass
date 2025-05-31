import AboutUsSection from '@/app/components/shared/AboutUsSection';
import Link from 'next/link';
import { BsCookie, BsDatabase, BsShieldLock } from 'react-icons/bs';
import { FiShare2, FiUsers } from 'react-icons/fi';
import { IoShieldOutline } from 'react-icons/io5';
import { MdOutlinePrivacyTip, MdSecurity } from 'react-icons/md';
import { RiUserSettingsLine } from 'react-icons/ri';

const IntegrityPolicyPage = () => {
  return (
    <section className="container mx-auto max-w-4xl w-full flex flex-col gap-8 sm:gap-10 py-4 sm:pt-10 pb-16 px-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <IoShieldOutline className="text-3xl text-primary-medium" />
          <h2 className="h-md text-primary-dark">Integritetspolicy</h2>
        </div>
        <div className="bg-primary-light rounded-lg p-6">
          <p className="text-lg">
            Din integritet är viktig för oss, och vi strävar efter att skydda
            dina personuppgifter i enlighet med gällande lagstiftning, inklusive
            EU:s allmänna dataskyddsförordning (GDPR).
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:gap-10">
        <AboutUsSection
          icon={<BsShieldLock />}
          title="Ansvarig för dataskydd"
          content={
            <div className="flex flex-col gap-2">
              <p>
                Vi ansvarar för behandlingen av dina personuppgifter. För frågor
                om vår integritetspolicy, kontakta oss via:
              </p>
              <p className="font-medium">E-post: bipolärkompassen@gmail.com</p>
            </div>
          }
        />

        <AboutUsSection
          icon={<BsDatabase />}
          title="Vilka uppgifter samlar vi in?"
          content={
            <div className="flex flex-col gap-2">
              <p>Vi samlar in och behandlar följande personuppgifter:</p>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li>
                  <strong>Grunduppgifter</strong>: Namn, e-postadress och
                  lösenord.
                </li>
                <li>
                  <strong>Hälsodata</strong>: Mediciner, ditt mående via
                  mood-tracker och historik.
                </li>
                <li>
                  <strong>Dagboksanteckningar</strong>: Textinnehåll som du
                  väljer att skriva i din dagbok.
                </li>
                <li>
                  <strong>Anhörigas kontaktuppgifter</strong>: E-postadresser
                  till anhöriga som du delar för notiser.
                </li>
                <li>
                  <strong>Notisinställningar</strong>: Information om dina
                  preferenser för medicinpåminnelser och måendenotiser till
                  anhöriga.
                </li>
                <li>
                  <strong>Tekniska uppgifter</strong>: Cookies och liknande
                  teknologier, inklusive information om din Spotify-sektion.
                </li>
                <li>
                  <strong>AI-konversationer</strong>: Information som delas i
                  konversationer mellan dig och vår AI-tjänst.
                </li>
              </ul>
            </div>
          }
        />

        <AboutUsSection
          icon={<FiUsers />}
          title="Hur samlas uppgifterna in?"
          content={
            <div className="flex flex-col gap-2">
              <p>Dina personuppgifter samlas in:</p>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li>
                  När du registrerar ett konto och fyller i dina uppgifter.
                </li>
                <li>När du använder mood-trackern eller skriver i dagboken.</li>
                <li>Genom inställningar för notiser och påminnelser.</li>
                <li>
                  Via cookies när du använder Spotify-sektionen och övriga delar
                  av webbplatsen.
                </li>
                <li>Under konversationer med vår AI-tjänst.</li>
              </ul>
            </div>
          }
        />

        <AboutUsSection
          icon={<FiShare2 />}
          title="Varför samlar vi in uppgifterna?"
          content={
            <div className="flex flex-col gap-2">
              <p>Vi behandlar dina uppgifter för att:</p>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li>
                  Tillhandahålla funktioner som mood-tracker, dagbok och
                  påminnelser.
                </li>
                <li>
                  Skicka notiser om mediciner eller mående, baserat på dina
                  inställningar.
                </li>
                <li>Ge dig en personlig och säker användarupplevelse.</li>
                <li>
                  Analysera och förbättra AI-konversationer för att leverera
                  relevanta svar och hjälp.
                </li>
                <li>Uppfylla rättsliga skyldigheter enligt GDPR.</li>
              </ul>
            </div>
          }
        />

        <AboutUsSection
          icon={<FiShare2 />}
          title="Delning av personuppgifter"
          content={
            <div className="flex flex-col gap-2">
              <p>
                Vi delar inte dina personuppgifter med tredje part, förutom i
                följande fall:
              </p>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li>
                  <strong>Tredjepartstjänster</strong>: Spotify-integrationen,
                  OpenAI för AI-tjänsten och e-posttjänster för notiser.
                </li>
                <li>
                  <strong>Rättsliga skyldigheter</strong>: Om vi är skyldiga
                  enligt lag att dela information.
                </li>
              </ul>
            </div>
          }
        />

        <AboutUsSection
          icon={<BsDatabase />}
          title="Lagring av uppgifter"
          content={
            <div className="flex flex-col gap-2">
              <p>
                Dina personuppgifter lagras endast så länge som det är
                nödvändigt för att uppfylla de syften för vilka de samlades in:
              </p>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li>
                  Grunduppgifter och hälsodata lagras så länge du har ett aktivt
                  konto.
                </li>
                <li>
                  Dagboksanteckningar och måendehistorik kan raderas av dig
                  eller när du avslutar ditt konto.
                </li>
                <li>
                  AI-konversationer kan anonymiseras för att förbättra tjänsten
                  utan att kopplas till din identitet.
                </li>
              </ul>
            </div>
          }
        />

        <AboutUsSection
          icon={<RiUserSettingsLine />}
          title="Dina rättigheter"
          content={
            <div className="flex flex-col gap-2">
              <p>Som användare har du följande rättigheter:</p>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li>
                  <strong>Tillgång till uppgifter</strong>: Du kan begära en
                  kopia av dina uppgifter.
                </li>
                <li>
                  <strong>Rättelse av uppgifter</strong>: Du kan uppdatera
                  felaktig information.
                </li>
                <li>
                  <strong>Radering av uppgifter</strong>: Du kan radera ditt
                  konto och all lagrad data.
                </li>
                <li>
                  <strong>Invändning mot behandling</strong>: Du kan invända mot
                  viss behandling av data.
                </li>
                <li>
                  <strong>Dataportabilitet</strong>: Du kan begära att dina
                  uppgifter överförs till en annan tjänst.
                </li>
              </ul>
            </div>
          }
        />

        <AboutUsSection
          icon={<BsCookie />}
          title="Cookies och spårning"
          content={
            <div className="flex flex-col gap-2">
              <p>
                Vi använder cookies för att förbättra användarupplevelsen,
                inklusive:
              </p>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li>
                  <strong>Nödvändiga cookies</strong>: För att webbplatsen ska
                  fungera korrekt.
                </li>
                <li>
                  <strong>Analyserande cookies</strong>: För att spåra
                  användaraktivitet och optimera funktioner.
                </li>
                <li>
                  <strong>Spotify-cookies</strong>: För att hantera din
                  Spotify-sektion.
                </li>
              </ul>
              <p>
                Du kan hantera dina cookie-inställningar via din webbläsare.
              </p>
            </div>
          }
        />

        <AboutUsSection
          icon={<MdSecurity />}
          title="Säkerhet"
          content={
            <div className="flex flex-col gap-2">
              <p>Vi använder avancerade säkerhetsåtgärder, inklusive:</p>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li>
                  <strong>JWT</strong> (JSON Web Tokens) för autentisering.
                </li>
                <li>Kryptering av lösenord med moderna algoritmer.</li>
                <li>Begränsad åtkomst till data.</li>
              </ul>
            </div>
          }
        />

        <AboutUsSection
          icon={<MdOutlinePrivacyTip />}
          title="Ändringar i denna policy"
          content={
            <div className="flex flex-col gap-2">
              <p>
                Denna policy kan komma att uppdateras vid behov. Vi informerar
                dig om väsentliga ändringar via e-post eller på webbplatsen.
              </p>
            </div>
          }
        />

        <AboutUsSection
          icon={<FiUsers />}
          title=" Kontakt"
          content={
            <div className="flex flex-col gap-2">
              <p>
                För frågor om denna policy eller behandling av dina
                personuppgifter, kontakta oss:
              </p>
              <p className="font-medium">E-post: bipolärkompassen@gmail.com</p>
              <p>
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
            Denna integritetspolicy gäller från och med 2025-01-31.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntegrityPolicyPage;
