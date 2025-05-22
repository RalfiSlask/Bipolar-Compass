import Image from 'next/image';

const OtherOrganizations = () => {
  return (
    <div className="flex flex-col gap-10 bg-tertiary-light w-full px-10 py-20">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-tertiary-dark text-center lg:text-left">
          Organisationer
        </h2>
        <p className="text-base sm:text-lg font-medium text-tertiary-dark text-center lg:text-left">
          Ta del av andra organisationers resurser och hjälp för att hitta
          information om bipolär sjukdom.
        </p>
      </div>
      <nav className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 place-items-center list-none">
        <li className="organization-container-home">
          <a
            href="https://balansriks.se/balans-foreningar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/organizations/balans.png"
              alt="Balans organization"
              width={200}
              height={200}
              className="p-2 w-full h-full object-contain"
            />
          </a>
        </li>
        <li className="organization-container-home">
          <a
            href="https://anhorigasriksforbund.se/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/organizations/anhoriga-riksforbund.png"
              alt="Anhöriga Riksförbund organization"
              width={200}
              height={200}
              className="p-2 w-full h-full object-contain"
            />
          </a>
        </li>
        <li className="organization-container-home">
          <a href="https://mind.se/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/organizations/mind.png"
              alt="Mind organization"
              width={200}
              height={200}
              className="p-2 w-full h-full object-contain"
            />
          </a>
        </li>
        <li className="organization-container-home">
          <a href="https://spes.se/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/organizations/spes.png"
              alt="SPES organization"
              width={200}
              height={200}
              className="p-2 w-full h-full object-contain"
            />
          </a>
        </li>
        <li className="organization-container-home">
          <a
            href="https://suicidezero.se/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/organizations/suicide-zero.png"
              alt="Suicide Zero organization"
              width={200}
              height={200}
              className="w-full h-full object-contain"
            />
          </a>
        </li>
        <li className="organization-container-home">
          <a
            href="https://anhoriga.se/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/organizations/nka.png"
              alt="NKA organization"
              width={200}
              height={200}
              className="w-full h-full object-contain"
            />
          </a>
        </li>
        <li className="organization-container-home">
          <a href="https://nsph.se/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/organizations/nsph.png"
              alt="NSPH organization"
              width={200}
              height={200}
              className="w-full h-full object-contain"
            />
          </a>
        </li>
        <li className="organization-container-home">
          <a
            href="https://www.bris.se/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/organizations/bris.png"
              alt="BRIS organization"
              width={200}
              height={200}
              className="w-full h-full object-contain"
            />
          </a>
        </li>
      </nav>
    </div>
  );
};

export default OtherOrganizations;
