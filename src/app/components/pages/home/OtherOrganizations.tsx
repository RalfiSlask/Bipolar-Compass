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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 place-items-center">
        <div className="rounded-full w-[150px] sm:w-[120px] lg:w-[100px] aspect-square">
          <Image
            src="/images/organizations/balans.png"
            alt="Balans organization"
            width={200}
            height={200}
            className="rounded-full p-2 w-full h-full object-contain"
          />
        </div>
        <div className="rounded-full bg-white p-4 w-[150px] sm:w-[120px] lg:w-[100px] aspect-square">
          <Image
            src="/images/organizations/anhoriga-riksforbund.png"
            alt="Anhöriga Riksförbund organization"
            width={200}
            height={200}
            className="rounded-full p-2 w-full h-full object-contain"
          />
        </div>
        <div className="rounded-full bg-white p-2 w-[150px] sm:w-[120px] lg:w-[100px] aspect-square">
          <Image
            src="/images/organizations/mind.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full p-2 w-full h-full object-contain"
          />
        </div>
        <div className="rounded-full bg-white p-4 w-[150px] sm:w-[120px] lg:w-[100px] aspect-square">
          <Image
            src="/images/organizations/spes.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full p-2 w-full h-full object-contain"
          />
        </div>
        <div className="rounded-full bg-white p-4 w-[150px] sm:w-[120px] lg:w-[100px] aspect-square">
          <Image
            src="/images/organizations/suicide-zero.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full w-full h-full object-contain"
          />
        </div>
        <div className="rounded-full bg-white p-4 w-[150px] sm:w-[120px] lg:w-[100px] aspect-square">
          <Image
            src="/images/organizations/nka.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full w-full h-full object-contain"
          />
        </div>
        <div className="rounded-full bg-white p-4 w-[150px] sm:w-[120px] lg:w-[100px] aspect-square">
          <Image
            src="/images/organizations/nsph.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full w-full h-full object-contain"
          />
        </div>
        <div className="rounded-full bg-white p-4 w-[150px] sm:w-[120px] lg:w-[100px] aspect-square">
          <Image
            src="/images/organizations/bris.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default OtherOrganizations;
