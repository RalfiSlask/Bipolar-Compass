import Image from 'next/image';

const OtherOrganizations = () => {
  return (
    <div className="flex flex-col gap-10 bg-tertiary-light w-full px-10 py-20">
      <div className="flex flex-col gap-4">
        <h2 className="text-5xl font-bold text-tertiary-dark">
          Organisationer
        </h2>
        <p className="text-lg font-medium text-tertiary-dark">
          Ta del av andra organisationers resurser och hjälp för att hitta
          information om bipolär sjukdom.
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="rounded-full">
          <Image
            src="/images/organizations/balans.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full p-2"
          />
        </div>
        <div className="rounded-full bg-white p-4">
          <Image
            src="/images/organizations/anhoriga-riksforbund.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full p-2"
          />
        </div>
        <div className="rounded-full bg-white p-2">
          <Image
            src="/images/organizations/mind.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full p-2"
          />
        </div>
        <div className="rounded-full bg-white p-4">
          <Image
            src="/images/organizations/spes.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full p-2"
          />
        </div>
        <div className="rounded-full bg-white p-4">
          <Image
            src="/images/organizations/suicide-zero.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full "
          />
        </div>
        <div className="rounded-full bg-white p-4">
          <Image
            src="/images/organizations/nka.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        <div className="rounded-full bg-white p-4">
          <Image
            src="/images/organizations/nsph.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        <div className="rounded-full bg-white p-4">
          <Image
            src="/images/organizations/bris.png"
            alt="other organizations"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default OtherOrganizations;
