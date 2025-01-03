import Link from 'next/link';
import LinkIcon from './components/shared/LinkIcon';

const NotFound = () => {
  return (
    <section className="flex flex-col items-start gap-6 pt-20">
      <h2 className="h-xl text-primary-dark mb-4 text-center sm:text-left">
        Sidan kunde inte hittas
      </h2>
      <p className="max-w-[600px]">
        Tyvärr kunde vi inte hitta sidan du letade efter. Men oroa dig inte! Det
        finns mycket annat att utforska här. Besök gärna våra andra sidor för
        information, stöd, eller inspiration.
      </p>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="h-xs text-primary-dark">Vad det kan bero på</h3>
          <ul className="w-full">
            <li>- Att du skrivit in en eller följt en länk som ej fungerar</li>
            <li>- Navigerat till en sida som ej längre existerar</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="h-xs text-primary-dark">För att fixa detta kan du</h3>
          <ul className="w-full">
            <li>- Navigera till sidor via menyn</li>
            <li>- Ändra webbadressen</li>
          </ul>
        </div>
      </div>

      <Link href="/" className="tertiary-button">
        Tillbaka till startsidan
      </Link>
      <p className="w-full flex items-center flex-wrap">
        <span className="mr-1">
          Om du ej hittar det du söker var vänlig att,
        </span>
        <Link
          className="underline hover:text-primary-dark inline-flex items-center"
          href="/om-oss/kontakt"
        >
          <LinkIcon />
          <span> kontakta oss.</span>
        </Link>
      </p>
    </section>
  );
};

export default NotFound;
